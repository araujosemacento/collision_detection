// Utility collision detection functions for p5.js

export function pointPoint(x1, y1, x2, y2, buffer = 3) {
	// Web version treats points like small circles to make interaction natural
	const distX = x1 - x2;
	const distY = y1 - y2;
	const distance = Math.sqrt(distX * distX + distY * distY);
	return distance <= buffer * 2;
}

export function pointCircle(px, py, cx, cy, r) {
	const distX = px - cx;
	const distY = py - cy;
	const distance = Math.sqrt(distX * distX + distY * distY);
	return distance <= r;
}

export function circleCircle(c1x, c1y, c1r, c2x, c2y, c2r) {
	const distX = c1x - c2x;
	const distY = c1y - c2y;
	const distance = Math.sqrt(distX * distX + distY * distY);
	return distance <= c1r + c2r;
}

export function pointRect(px, py, rx, ry, rw, rh) {
	return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

export function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
	return (
		r1x + r1w >= r2x &&
		r1x <= r2x + r2w &&
		r1y + r1h >= r2y &&
		r1y <= r2y + r2h
	);
}

export function circleRect(cx, cy, radius, rx, ry, rw, rh) {
	let testX = cx;
	let testY = cy;

	if (cx < rx) testX = rx;
	else if (cx > rx + rw) testX = rx + rw;

	if (cy < ry) testY = ry;
	else if (cy > ry + rh) testY = ry + rh;

	const distX = cx - testX;
	const distY = cy - testY;
	const distance = Math.sqrt(distX * distX + distY * distY);

	return distance <= radius;
}

export function linePoint(x1, y1, x2, y2, px, py) {
	const d1 = Math.hypot(px - x1, py - y1);
	const d2 = Math.hypot(px - x2, py - y2);
	const lineLen = Math.hypot(x2 - x1, y2 - y1);
	const buffer = 0.3;
	return d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer;
}

export function lineCircle(x1, y1, x2, y2, cx, cy, r) {
	const inside1 = pointCircle(x1, y1, cx, cy, r);
	const inside2 = pointCircle(x2, y2, cx, cy, r);
	if (inside1 || inside2) return true;

	const len = Math.hypot(x1 - x2, y1 - y2);
	const dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(len, 2);

	const closestX = x1 + dot * (x2 - x1);
	const closestY = y1 + dot * (y2 - y1);

	const onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
	if (!onSegment) return false;

	const distX = closestX - cx;
	const distY = closestY - cy;
	const distance = Math.sqrt(distX * distX + distY * distY);

	return distance <= r;
}

export function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
	const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
	if (denom === 0) return false;

	const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
	const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

	return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
}

export function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
	const left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
	const right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
	const top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
	const bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

	return left || right || top || bottom;
}

export function polyPoint(vertices, px, py) {
	let collision = false;
	let next = 0;
	for (let current = 0; current < vertices.length; current++) {
		next = current + 1;
		if (next === vertices.length) next = 0;

		const vc = vertices[current];
		const vn = vertices[next];

		if (
			((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
			px < ((vn.x - vc.x) * (py - vc.y)) / (vn.y - vc.y) + vc.x
		) {
			collision = !collision;
		}
	}
	return collision;
}

export function polyCircle(vertices, cx, cy, r) {
	let next = 0;
	for (let current = 0; current < vertices.length; current++) {
		next = current + 1;
		if (next === vertices.length) next = 0;

		const vc = vertices[current];
		const vn = vertices[next];

		const collision = lineCircle(vc.x, vc.y, vn.x, vn.y, cx, cy, r);
		if (collision) return true;
	}
	return false;
}

export function polyRect(rx, ry, rw, rh, vertices) {
	let next = 0;
	for (let current = 0; current < vertices.length; current++) {
		next = current + 1;
		if (next === vertices.length) next = 0;

		const vc = vertices[current];
		const vn = vertices[next];

		const collision = lineRect(vc.x, vc.y, vn.x, vn.y, rx, ry, rw, rh);
		if (collision) return true;
	}

	const inside = polyPoint(vertices, rx, ry);
	if (inside) return true;

	return false;
}

export function polyLine(vertices, x1, y1, x2, y2) {
	let next = 0;
	for (let current = 0; current < vertices.length; current++) {
		next = current + 1;
		if (next === vertices.length) next = 0;

		const x3 = vertices[current].x;
		const y3 = vertices[current].y;
		const x4 = vertices[next].x;
		const y4 = vertices[next].y;

		const hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
		if (hit) return true;
	}
	return false;
}

export function polyPoly(p1, p2) {
	let next = 0;
	for (let current = 0; current < p1.length; current++) {
		next = current + 1;
		if (next === p1.length) next = 0;

		const vc = p1[current];
		const vn = p1[next];

		const collision = polyLine(p2, vc.x, vc.y, vn.x, vn.y);
		if (collision) return true;
	}

	// 1. Testa se o Polígono 2 está totalmente DENTRO do Polígono 1
	const inside1 = polyPoint(p1, p2[0].x, p2[0].y);
	if (inside1) return true;

	// 2. Testa se o Polígono 1 está totalmente DENTRO do Polígono 2
	const inside2 = polyPoint(p2, p1[0].x, p1[0].y);
	if (inside2) return true;

	return false;
}

export function triPoint(px, py, x1, y1, x2, y2, x3, y3) {
	const areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
	const area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
	const area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
	const area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));

	return Math.abs(area1 + area2 + area3 - areaOrig) < 0.01;
}
