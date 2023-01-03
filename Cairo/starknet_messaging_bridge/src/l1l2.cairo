// ######## Messaging bridge evaluator

%lang starknet
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.messages import send_message_to_l1
from starkware.starknet.common.syscalls import get_contract_address
from starkware.cairo.common.alloc import alloc
const MESSAGE_TYPE = 0;

// ######## External functions
// These functions are callable by other contracts
//
@external
func create_l1_nft_message{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    l1_user: felt
) {
    alloc_locals;

    let (message_payload: felt*) = alloc();
    assert message_payload[0] = l1_user;
    send_message_to_l1(to_address=0x6DD77805FD35c91EF6b2624Ba538Ed920b8d0b4E, payload_size=1, payload=message_payload);

    return ();
}