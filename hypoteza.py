import math

def getresidues(mod):
    res = []
    for i in range(1, mod // 2 + 1, 1):
        res.append((i * i) % mod)
    return res

def isprime(num):
    if num < 2:
        return False
    if num == 2:
        return True
    if num % 2 == 0:  
        return False
    for i in range(3, int(math.sqrt(num)) + 1, 2):
        if num % i == 0:
            return False
    return True    
        

def getprimes(num):
    primes = []
    for i in range(1, num + 1):
        if (isprime(i)):
            primes.append(i)

    return primes

primes = getprimes(1000000)
        

def numofres(mod):
    numqr = 0
    numqnr = 0
    res = set(getresidues(mod))
    for elem in res:
        if elem == 1:
            continue
        if (1 - elem) % mod in res:
            numqr += 1
        else:
            numqnr += 1

    if mod % 4 == 1:
        if numqr == mod // 4 - 1 and numqnr == mod // 4:
            return True
        else:
            return False

    if mod % 4 == 3:
        if numqr == mod // 4 and numqnr == mod // 4:
            return True
        else:
            return False

for el in primes:
    c = 0
    if (numofres(el) == False):
        print('failed:', el)
        c += 1
    else:
        print(el)
print(c)
