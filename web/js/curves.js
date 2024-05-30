function isPrime(number) {
    if (number == 2) {
        return 2;
    }

    if (number < 2) {
        return -1;
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return 1;
        }
    }

    return 0;
}

function getPrimes(max) {
    const primes = [];
    
    for (let i = 0; i < max; i++) {
        if (isPrime(i) == 0) {
            primes.push(i);
        }
    }

    return primes;
}

function makePositive(num, p) {
    while (num < 0) {
        num += p;
    }

    return num;
}

function handleResult(result, p) {
    if (result[0] >= p / 2) {
        result[0] -= p; 
    } 
    
    if (result[1] >= p / 2) {
        result[1] -= p;
    }

    return result;
}

function getInverse(num, p) {
    num = makePositive(num, p);

    for (let i = 0; i < p; i++) {
        if ((i * num) % p === 1) {
            return i;
        }
    }
}

function getResidues(p) {
    const res = [];
    for (let i = 1; i <= Math.floor(p / 2); i++) {
        res.push((i * i) % p);
    }

    return res;
}

function getPoints(p, a, d) {
    const points = [];
    let xnum = 0;
    let ynum = 0;
    const residues = getResidues(p);

    for (const r of residues) {
        xnum += 1;
        ynum += 1;
        if ((a * r) % p === 1) {
            points.push({ x: xnum, y: 0});
            points.push({ x: -xnum, y: 0});
        }
        if (r % p === 1) {
            points.push({ x: 0, y: ynum });
            points.push({ x: 0, y: -ynum });
        }
    }

    xnum = 0;
    ynum = 0;
    for (const x of residues) {
        xnum += 1;
        ynum = 0;
        for (const y of residues) {
            ynum += 1;
            if ((a * x + y) % p === (1 + d * x * y) % p) {
                points.push({ x: xnum, y: ynum});
                points.push({ x: xnum, y: -ynum});
                points.push({ x: -xnum, y: ynum});
                points.push({ x: -xnum, y: -ynum });
            }
        }
    }
    
    return points;
}

function isAPoint(p, a, d, x, y) {
    const points = getPoints(p, a, d);
    
    for (const point of points) {
        if (x === point.x && y === point.y) {
            return true;
        }
    }
    
    return false;
}

function addPoints(x1, y1, x2, y2, p, a, d) {
    let result = [];
    
    let r1 = makePositive((x1 * y2 + y1 * x2) % p, p);
    let r2 = makePositive(getInverse((1 + d * x1 * x2 * y1 * y2) % p, p), p);
    result.push((r1 * r2) % p);
    
    let r3 = makePositive((y1 * y2 - a * x1 * x2) % p, p);
    let r4 = makePositive(getInverse((1 - d * x1 * x2 * y1 * y2) % p, p), p);
    result.push((r3 * r4) % p);
    
    return result;
}