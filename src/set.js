// vim: set ts=4 sts=4 sw=4 noet

class VtxSet {
    constructor(other) {
        if (arguments.length) {
            if (other instanceof VtxSet) {
                this.set = new Set(other.set);
            } else {
                this.set = new Set(other);
            }
        } else {
            this.set = new Set();
        }
    }

    unionWith(other) {
        let result = new VtxSet(other);
        for (let elem of this.set) {
            result.set.add(elem);
        }
        return result;
    }

    intersectWith(other) {
        let result = new VtxSet();
        for (let elem of this.set) {
            if (other.set.has(elem)) {
                result.set.add(elem);
            }
        }
        return result;
    }

    subtract(other) {
        let result = new VtxSet(this);
        for (let elem of other.set) {
            result.set.delete(elem);
        }
        return result;
    }

    has(v) {
        return this.set.has(v);
    }

    clear(v) {
        this.set.delete(v);
        return this;
    }

    add(v, w) {
        if (arguments.length === 1) {
            this.set.add(v);
        } else {
            for (let i=v; i<w; i++) {
                this.set.add(i);
            }
        }
        return this;
    }
    
    cardinality() {
        return this.set.size;
    }

    isEmpty() {
        return this.cardinality() === 0;
    }

    isSuperset(other) {
        for (let v of other.set) {
            if (!this.set.has(v)) {
                return false;
            }
        }
        return true;
    }

    and(other) {
        for (let v of new Set(this.set)) {
            if (!other.set.has(v)) {
                this.set.delete(v);
            }
        }
        return this;
    }

    or(other) {
        for (let v of other.set) {
            this.add(v);
        }
        return this;
    }

    toArray() {
        return [...this.set].sort((a,b) => a - b);
    }

    compareTo(other) {
        let union = this.unionWith(other).toArray().reverse();
        for (let v of union) {
            if (this.has(v) && !other.has(v)) {
                return 1;
            }
            if (other.has(v) && !this.has(v)) {
                return -1;
            }
        }
        return 0;
    }

    equals(other) {
        return this.compareTo(other) === 0;
    }

    hashCode() {
        let result = 0;
        for (let v of this.set) {
            result += v;
        }
        return result;
    }
}

export default VtxSet;
