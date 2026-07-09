#![no_std]
#![no_main]
#![feature(alloc_error_handler)]

#[cfg(not(target_arch = "wasm32"))]
compile_error!("target arch should be wasm32: compile with '--target wasm32-unknown-unknown'");

extern crate alloc;

use alloc::{format, string::String};
use core::{
    alloc::{GlobalAlloc, Layout},
    cell::UnsafeCell,
    panic::PanicInfo,
    ptr::null_mut,
};
use casper_contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};
use casper_types::{
    contracts::{EntryPoint, NamedKeys},
    CLType, EntryPointAccess, EntryPointType, EntryPoints, Parameter,
};

const HEAP_SIZE: usize = 64 * 1024;

#[repr(align(16))]
struct AlignedHeap([u8; HEAP_SIZE]);

struct BumpAllocator {
    offset: UnsafeCell<usize>,
}

unsafe impl Sync for BumpAllocator {}

#[global_allocator]
static ALLOCATOR: BumpAllocator = BumpAllocator {
    offset: UnsafeCell::new(0),
};

static mut HEAP: AlignedHeap = AlignedHeap([0; HEAP_SIZE]);

unsafe impl GlobalAlloc for BumpAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        let heap_start = core::ptr::addr_of_mut!(HEAP.0).cast::<u8>() as usize;
        let current_offset = *self.offset.get();
        let alloc_start = align_up(heap_start + current_offset, layout.align());
        let new_offset = alloc_start
            .saturating_add(layout.size())
            .saturating_sub(heap_start);

        if new_offset > HEAP_SIZE {
            null_mut()
        } else {
            *self.offset.get() = new_offset;
            alloc_start as *mut u8
        }
    }

    unsafe fn dealloc(&self, _ptr: *mut u8, _layout: Layout) {}
}

fn align_up(value: usize, align: usize) -> usize {
    debug_assert!(align.is_power_of_two());
    (value + align - 1) & !(align - 1)
}

#[panic_handler]
fn panic(_: &PanicInfo) -> ! {
    core::arch::wasm32::unreachable()
}

#[alloc_error_handler]
fn alloc_error(_: Layout) -> ! {
    core::arch::wasm32::unreachable()
}

#[no_mangle]
pub extern "C" fn record_guard_action() {
    let treasury_id: String = runtime::get_named_arg("treasury_id");
    let action: String = runtime::get_named_arg("action");

    let record_str = format!("{}:{}", treasury_id, action);

    if runtime::has_key("latest_action") {
        let uref = runtime::get_key("latest_action")
            .unwrap_or_revert()
            .into_uref()
            .unwrap_or_revert();
        storage::write(uref, record_str);
    } else {
        let uref = storage::new_uref(record_str);
        runtime::put_key("latest_action", uref.into());
    }
}

#[no_mangle]
pub extern "C" fn call() {
    let mut entry_points = EntryPoints::new();

    let record_action = EntryPoint::new(
        "record_guard_action",
        alloc::vec![
            Parameter::new("treasury_id", CLType::String),
            Parameter::new("action", CLType::String),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Called,
    );
    entry_points.add_entry_point(record_action.into());

    let named_keys = NamedKeys::new();
    let (contract_hash, _version) =
        storage::new_contract(entry_points, Some(named_keys), None, None, None);

    runtime::put_key("treasury_guard_contract_final", contract_hash.into());
}
