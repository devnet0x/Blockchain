#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 13 11:56:19 2021

@author: jnavon
"""

# x = 10
# def func1(y):
#   print(y)
#
# func1(x)
# func1(2 * x)
#
# x = 10
# def func2(y):
#   print(y)
#   x = 1
#
# func2(x)
# func2(x)
#
# def func3(y):
#   y = y + 1
#   print(y)
#
# func3(x)
# print(y)

# las listas son mutables

# x = [10, 20, 30]
# def pick_first(x):
#   print(x)
#   x[0] = 0
#
#
# pick_first(x)
# pick_first(x)

# los diccionarios son mutables

# x = {'a':10, 'b':20, 'c':30}
# def pick_b(x):
#   print(x['b'])
#   x['b'] = 100
#
#
# pick_b(x)
# pick_b(x)

# el valor de retorno de una función
# def  sum3(x, y, z):
#   w = x + y + z
#   return w
# print (sum3(1,3,5))
# print (sum3(1,2,sum3(3, 4, 5)))
#
# #puede retornar + de 1 valor en forma de tupla
# def first_and_third(x, y, z):
#   return x, z
#
# x, y  = first_and_third('esto','no','funciona')
# print(x + " " + y)


# especificando parámetros en forma explícita
# def func2(x, y, z):
#   return x + 2 * y + 3 * z
#
# value = func2(1, 2, 3)
# print(value)
# value = func2(z=3, x=1, y=2)
# print(value)

# especificando valores por defecto
# def func2(x=0, y=0, z=0):
#   return x + 2 * y + 3 * z
#
# value = func2(1, 2, 3)
# print(value)
# value = func2(1, 2)
# print(value)
# value = func2(1)
# print(value)
# value = func2()
# print(value)

#funciones recursivas
def suma(x):
  l = len(x)
  if l == 0:
    return 0
  else:
    last = x.pop()
    print(last, x)
    return suma(x) + last

print(suma([7, 4, 23]))
print('=' * 15)
print(suma([1,2,3,4,5]))
