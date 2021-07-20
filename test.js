// vim: set ts=4 sts=4 noet

import test from 'ava';
import {VtxSet} from './index.js';

test('main', t => {
//	T.throws(() => {
//		unicornFun(123);
//	}, {
//		instanceOf: TypeError,
//		message: 'Expected a string, got number'
//	});
//
	let a = new VtxSet([1,2,3]);
	let b = new VtxSet(a);
	let c = new VtxSet(a.set);
        t.deepEqual(a, b);
        t.deepEqual(a, c);

        t.true(new VtxSet([1,2,3]).unionWith(new VtxSet([2,4,5])).equals(
                    new VtxSet([1,2,3,4,5])));

        t.true(new VtxSet([1,2,3]).intersectWith(new VtxSet([2,4,5])).equals(
                    new VtxSet([2])));

        t.true(new VtxSet([1,2,3]).subtract(new VtxSet([2,4,5])).equals(
                    new VtxSet([1,3])));

        a.add(5);
	let d = new VtxSet([1,2,3,5]);
        t.deepEqual(a, d);

        d.clear(3);
        t.deepEqual(d, new VtxSet([1,2,5]));

        t.true(d.has(1));
        t.false(d.has(7));

        a.add(10, 15);
        t.deepEqual(a, new VtxSet([1,2,3,5,10,11,12,13,14]));

        t.is(a.cardinality(), 9);

        t.false(a.isEmpty());
        t.true(new VtxSet().isEmpty());

        t.false(new VtxSet([1,2,3]).isSuperset(new VtxSet([3,4,5])));
        t.true(new VtxSet([1,2,3]).isSuperset(new VtxSet([2,3])));

        a.and(new VtxSet([2,3,15]));
        t.deepEqual(a, new VtxSet([2,3]));

        a.or(new VtxSet([1, 16]));
        t.deepEqual(a, new VtxSet([2,3,1,16]));

        t.deepEqual(a.toArray(), [1,2,3,16]);

        t.is(new VtxSet([1,2,3]).compareTo(new VtxSet([2,4,5])), -1);
        t.is(new VtxSet([1,2,3,6]).compareTo(new VtxSet([2,4,5])), 1);
        t.is(new VtxSet([2,3,6]).compareTo(new VtxSet([1,2,3,6])), -1);
        t.is(new VtxSet([2,3,6]).compareTo(new VtxSet([2,3,6])), 0);

        t.false(new VtxSet([2,5,6]).equals(new VtxSet([2,3,6])));
        t.true(new VtxSet([2,3,6]).equals(new VtxSet([2,3,6])));
});
