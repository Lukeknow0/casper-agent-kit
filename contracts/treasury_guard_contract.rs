// Reference Odra-style contract sketch for the buildathon demo.
// Replace with the generated Odra project before final deployment.

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct GuardActionRecord {
    pub treasury_id: String,
    pub action: String,
    pub caller: String,
    pub timestamp_ms: u64,
}

pub trait TreasuryGuardContract {
    fn record_guard_action(&mut self, treasury_id: String, action: String);
    fn latest_action(&self) -> Option<GuardActionRecord>;
}
