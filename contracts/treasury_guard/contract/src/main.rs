#![no_std]
#![no_main]

#[cfg(not(target_arch = "wasm32"))]
compile_error!("target arch should be wasm32: compile with '--target wasm32-unknown-unknown'");

extern crate alloc;

use alloc::{format, string::String};
use casper_contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};
use casper_types::{
    contracts::{EntryPoint, NamedKeys},
    CLType, EntryPointAccess, EntryPointType, EntryPoints, Parameter,
};

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
