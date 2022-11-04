from Crypto.Util.number import *


def derivate_privkey(p, r, s1, s2, z1, z2):
    z = z1 - z2
    s = s1 - s2
    r_inv = inverse(r, p)
    s_inv = inverse(s, p)
    k = (z * s_inv) % p
    d = (r_inv * (s1 * k - z1)) % p
    return d, k

z1 = 0x4f6a8370a435a27724bbc163419042d71b6dcbeb61c060cc6816cda93f57860c
s1 = 0x2bbd9c2a6285c2b43e728b17bda36a81653dd5f4612a2e0aefdb48043c5108de
r = 0x69a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166
z2 = 0x350f3ee8007d817fbd7349c477507f923c4682b3e69bd1df5fbb93b39beb1e04
s2 = 0x7724cedeb923f374bef4e05c97426a918123cc4fec7b07903839f12517e1b3c8

#Magic number defined by starndar cryptographic group at http://www.secg.org/sec2-v2.pdf
p  = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 

print("privatekey:%x\n k:%x" % derivate_privkey(p,r,s1,s2,z1,z2))
