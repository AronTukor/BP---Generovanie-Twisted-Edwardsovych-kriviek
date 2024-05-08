import timeit

def getresidues(mod):
    res = []
    for i in range(1, mod // 2 + 1, 1):
        res.append((i * i) % mod)
    return res

def fillpoints_fast(mod, a, d):
    points = []
    xnum, ynum = 0, 0
    residues = getresidues(mod)

    for x in residues:
        xnum += 1
        if (a * x) % mod == 1:
            points.append((xnum, 0))
            points.append((-xnum, 0))

    for y in residues:
        ynum += 1
        if y % mod == 1:
            points.append((0, ynum))
            points.append((0, -ynum))

    xnum, ynum = 0, 0
    for x in residues:
        xnum += 1
        ynum = 0
        for y in residues:
            ynum += 1
            if (a * x + y) % mod == (1 + d * x * y) % mod:
                points.append((xnum, ynum))
                points.append((xnum, -ynum))
                points.append((xnum, ynum))
                points.append((-xnum, -ynum))
    return points

def fillpoints(mod, a, d):
    points = []
    for xnum in range(0, mod):
        for ynum in range(0, mod):
            if (a * xnum**2 + ynum**2) == (1 + d * xnum**2 * ynum**2):
                points.append((xnum, ynum))
                points.append((xnum, -ynum))
                points.append((xnum, ynum))
                points.append((-xnum, -ynum))
    return points

mod = 10007
a = 22
d = 30

time_fast = timeit.timeit("fillpoints_fast(mod, a, d)", globals=globals(), number=10)

time_normal = timeit.timeit("fillpoints(mod, a, d)", globals=globals(), number=10)

print("Time taken for fillpoints_fast:", time_fast)
print("Time taken for fillpoints:", time_normal)
