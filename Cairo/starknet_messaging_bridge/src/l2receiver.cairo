// ######## Messaging bridge ex4

%lang starknet
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.messages import send_message_to_l1
from starkware.cairo.common.alloc import alloc

@storage_var
func random_value() -> (rnd: felt) {
}

@l1_handler
func l2_message_receiver{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    from_address: felt, >rnd: felt
) {
    random_value.write(rnd);
    return ();
}

@view
func l1_assigned_var{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (rnd: felt)  {
    alloc_locals;
    let (rnd) = random_value.read();
    return(rnd,);
}