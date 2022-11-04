import random
import sys
from web3 import Web3
# CREATE2
# keccak256(0xff ++ deployingAddr ++ salt ++ keccak256(bytecode))[12:]
def _create2(deployer, salt_hexstr, hashed_bytecode):
    addr_hexbytes = Web3.keccak(hexstr=('ff' + deployer + salt_hexstr +
hashed_bytecode))
    addr = Web3.toHex(addr_hexbytes)[-40:]
    return addr
# expecting deployer='aabbccdd' (20 bytes -> 40 characters)
# salt = some decimal number
# bytecode = 'aabbccddeeff...' (variable length)
def create2(deployer, salt, bytecode):
    assert(len(deployer) == 40)
    assert(len(bytecode) % 2 == 0)
    salt_hexstr = hex(salt)[2:].zfill(64)
    hashed_bytecode = Web3.toHex(Web3.keccak(hexstr=bytecode))[2:]
    return _create2(deployer, salt_hexstr, hashed_bytecode)
def create2_search(deployer, predicate, bytecode):
    salt = 0
    hashed_bytecode = Web3.toHex(Web3.keccak(hexstr=bytecode))[2:]
    while True:
        salt += 1
        salt_hexstr = hex(salt)[2:].zfill(64)
        addr = _create2(deployer, salt_hexstr, hashed_bytecode)
        if salt % 1000 == 0:
            print('.', end='', flush=True)
        if predicate(addr):
            print(f"\nFound a match after {salt} attempts: {addr}")
            break
def main():
    if len(sys.argv) != 4:
        print(f"Usage: python3 {sys.argv[0]} deployer_addr <salt |predicate> bytecode")
        print()
        print(f"When passing a salt value, this script prints theaddress of the newly deployed contract based on the deployer address andbytecode hash.")
        print(f"Example: python3 {sys.argv[0]}Bf6cE3350513EfDcC0d5bd5413F1dE53D0E4f9aE 42 602a60205260206020f3")
        print()
        print(f"When passing a predicate, this script will search for a salt value such that the new address satisfies the predicate.")
        print(f"Example: python3 {sys.argv[0]}Bf6cE3350513EfDcC0d5bd5413F1dE53D0E4f9aE 'lambda addr: \"badc0de\" in addr.lower()' 602a60205260206020f3")
        print(f"Another predicate that may be useful: 'lambda addr:addr.startswith(\"0\" * 8)' 602a60205260206020f3")
        #python3 fuzzy.py Aa0E23a3ac47b0E67c63b19DF4656DD77b3cED59 'lambda addr: "badc0de" in addr.lower()' 1057600080fd5b50610163806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806306fdde031461003b578063884965eb14610059575b600080fd5b61004361009d565b6040518082815260200191505060405180910390f35b61009b6004803603602081101561006f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100c5565b005b60007f736d617278000000000000000000000000000000000000000000000000000000905090565b60008190508073ffffffffffffffffffffffffffffffffffffffff1663380c7a676040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561011257600080fd5b505af1158015610126573d6000803e3d6000fd5b50505050505056fea265627a7a7231582041717f563a5e376688abfa15f7116939ed9aa5c93f02fcd3950534ec9b5698b364736f6c63430005110032
        #Found a match after 5959556 attempts: 94b337babcf74badc0de22a13e8e1bce9935e650
        sys.exit(0)
        
    deployer_addr = sys.argv[1]
    if deployer_addr.startswith('0x'):
        deployer_addr = deployer_addr[2:]
    bytecode = sys.argv[3]
    try:
        salt = int(sys.argv[2])
        print(create2(deployer_addr, salt, bytecode))
    except ValueError:
        predicate = eval(sys.argv[2])
        create2_search(deployer_addr, predicate, bytecode)
if __name__ == '__main__':
    main()