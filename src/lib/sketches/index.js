import * as col from './collisions.js';

function getCanvasWidth(container) {
	if (!container) return 600;
	return Math.min(container.clientWidth || 600, 600);
}

export const Introduction = (container) => (p) => {
	const numEach = 50;
	let cx, cy;
	const cr = 30;
	const circles = [];
	const rectangles = [];
	const lines = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		cx = p.width / 2;
		cy = p.height / 2;

		for (let i = 0; i < numEach; i++) {
			circles.push({
				x: p.random(p.width),
				y: p.random(-p.height, p.height),
				r: p.random(8, 20),
				speed: p.random(0.5, 2),
				hit: false
			});

			rectangles.push({
				x: p.random(p.width),
				y: p.random(-p.height, p.height),
				w: p.random(8, 20),
				h: p.random(8, 20),
				speed: p.random(0.5, 2),
				hit: false
			});

			const x = p.random(p.width);
			const y = p.random(-p.height, p.height);
			lines.push({
				x1: x,
				y1: y,
				x2: x + p.random(-20, 20),
				y2: y + p.random(-20, 20),
				speed: p.random(0.5, 2),
				hit: false
			});
		}
	};

	p.draw = () => {
		p.background(255);

		if (p.mouseX !== p.pmouseX || p.mouseY !== p.pmouseY) {
			cx = p.mouseX;
			cy = p.mouseY;
		}

		p.fill(0, 150);
		p.noStroke();
		p.ellipse(cx, cy, cr * 2, cr * 2);

		for (let i = circles.length - 1; i >= 0; i--) {
			const c = circles[i];
			c.y += c.speed;
			c.hit = col.circleCircle(c.x, c.y, c.r, cx, cy, cr);

			p.fill(c.hit ? [255, 150, 0, 150] : [0, 150, 255, 150]);
			p.noStroke();
			p.ellipse(c.x, c.y, c.r * 2, c.r * 2);

			if (c.y > p.height + 50) {
				circles.splice(i, 1);
				circles.push({
					x: p.random(p.width),
					y: p.random(-p.height, -50),
					r: p.random(8, 20),
					speed: p.random(0.5, 2),
					hit: false
				});
			}
		}

		for (let i = rectangles.length - 1; i >= 0; i--) {
			const r = rectangles[i];
			r.y += r.speed;
			r.hit = col.circleRect(cx, cy, cr, r.x, r.y, r.w, r.h);

			p.fill(r.hit ? [255, 150, 0, 150] : [0, 150, 255, 150]);
			p.noStroke();
			p.rect(r.x, r.y, r.w, r.h);

			if (r.y > p.height + 50) {
				rectangles.splice(i, 1);
				rectangles.push({
					x: p.random(p.width),
					y: p.random(-p.height, -50),
					w: p.random(8, 20),
					h: p.random(8, 20),
					speed: p.random(0.5, 2),
					hit: false
				});
			}
		}

		for (let i = lines.length - 1; i >= 0; i--) {
			const l = lines[i];
			l.y1 += l.speed;
			l.y2 += l.speed;
			l.hit = col.lineCircle(l.x1, l.y1, l.x2, l.y2, cx, cy, cr);

			p.stroke(l.hit ? [255, 150, 0, 150] : [0, 150, 255, 150]);
			p.strokeWeight(5);
			p.line(l.x1, l.y1, l.x2, l.y2);

			if (l.y1 > p.height + 50 && l.y2 > p.height + 50) {
				lines.splice(i, 1);
				const x = p.random(p.width);
				const y = p.random(-p.height, -50);
				lines.push({
					x1: x,
					y1: y,
					x2: x + p.random(-20, 20),
					y2: y + p.random(-20, 20),
					speed: p.random(0.5, 2),
					hit: false
				});
			}
		}
	};
};

export const PointPoint = (container) => (p) => {
	let targetX, targetY;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.strokeWeight(15);
		targetX = p.width / 2;
		targetY = p.height / 2;
	};

	p.draw = () => {
		const px = p.mouseX;
		const py = p.mouseY;

		const colliding = col.pointPoint(px, py, targetX, targetY);
		p.background(colliding ? [255, 150, 0] : 255);

		p.stroke(0, 150, 255);
		p.point(targetX, targetY);

		p.stroke(0, 150);
		p.point(px, py);
	};
};

export const PointCircle = (container) => (p) => {
	let cx, cy;
	const radius = 100;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.strokeWeight(15);
		cx = p.width / 2;
		cy = p.height / 2;
	};

	p.draw = () => {
		p.background(255);
		const px = p.mouseX;
		const py = p.mouseY;

		const hit = col.pointCircle(px, py, cx, cy, radius);

		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.noStroke();
		p.ellipse(cx, cy, radius * 2, radius * 2);

		p.stroke(0);
		p.point(px, py);
	};
};

export const CircleCircle = (container) => (p) => {
	const c1r = 30;
	let c2x, c2y;
	const c2r = 100;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.noStroke();
		c2x = p.width / 2;
		c2y = p.height / 2;
	};

	p.draw = () => {
		p.background(255);
		const c1x = p.mouseX;
		const c1y = p.mouseY;

		const hit = col.circleCircle(c1x, c1y, c1r, c2x, c2y, c2r);

		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.ellipse(c2x, c2y, c2r * 2, c2r * 2);

		p.fill(0, 150);
		p.ellipse(c1x, c1y, c1r * 2, c1r * 2);
	};
};

export const PointRect = (container) => (p) => {
	const sw = 200;
	const sh = 200;
	let sx, sy;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.strokeWeight(15);
		sx = p.width / 2 - sw / 2;
		sy = p.height / 2 - sh / 2;
	};

	p.draw = () => {
		p.background(255);
		const px = p.mouseX;
		const py = p.mouseY;

		const hit = col.pointRect(px, py, sx, sy, sw, sh);

		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.noStroke();
		p.rect(sx, sy, sw, sh);

		p.stroke(0);
		p.point(px, py);
	};
};

export const RectRect = (container) => (p) => {
	const s1w = 30;
	const s1h = 30;
	const s2w = 200;
	const s2h = 200;
	let s2x, s2y;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.noStroke();
		s2x = p.width / 2 - s2w / 2;
		s2y = p.height / 2 - s2h / 2;
	};

	p.draw = () => {
		p.background(255);
		const s1x = p.mouseX;
		const s1y = p.mouseY;

		const hit = col.rectRect(s1x, s1y, s1w, s1h, s2x, s2y, s2w, s2h);

		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.rect(s2x, s2y, s2w, s2h);

		p.fill(0, 150);
		p.rect(s1x, s1y, s1w, s1h);
	};
};

export const CircleRect = (container) => (p) => {
	const r = 30;
	const sw = 200;
	const sh = 200;
	let sx, sy;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.noStroke();
		sx = p.width / 2 - sw / 2;
		sy = p.height / 2 - sh / 2;
	};

	p.draw = () => {
		p.background(255);
		const cx = p.mouseX;
		const cy = p.mouseY;

		const hit = col.circleRect(cx, cy, r, sx, sy, sw, sh);

		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.rect(sx, sy, sw, sh);

		p.fill(0, 150);
		p.ellipse(cx, cy, r * 2, r * 2);
	};
};

export const LinePoint = (container) => (p) => {
	let x1, y1, x2, y2;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.strokeWeight(15);
		p.noCursor();
		x1 = 100;
		y1 = p.height - 100;
		x2 = p.width - 100;
		y2 = 100;
	};

	p.draw = () => {
		p.background(255);
		const px = p.mouseX;
		const py = p.mouseY;

		const hit = col.linePoint(x1, y1, x2, y2, px, py);

		p.stroke(hit ? [255, 150, 0, 150] : [0, 150, 255, 150]);
		p.line(x1, y1, x2, y2);

		p.stroke(0, 150);
		p.point(px, py);
	};
};

export const LineCircle = (container) => (p) => {
	const r = 30;
	let x1, y1, x2, y2;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		x1 = 100;
		y1 = p.height - 100;
		x2 = p.width - 100;
		y2 = 100;
	};

	p.draw = () => {
		p.background(255);
		const cx = p.mouseX;
		const cy = p.mouseY;

		const hit = col.lineCircle(x1, y1, x2, y2, cx, cy, r);

		p.strokeWeight(15);
		p.stroke(hit ? [255, 150, 0, 150] : [0, 150, 255, 150]);
		p.line(x1, y1, x2, y2);

		// desenha o ponto de interseção/projeção mais próximo se estiver no segmento
		const len = Math.hypot(x1 - x2, y1 - y2);
		if (len !== 0) {
			const dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / Math.pow(len, 2);
			const closestX = x1 + dot * (x2 - x1);
			const closestY = y1 + dot * (y2 - y1);
			const onSegment = col.linePoint(x1, y1, x2, y2, closestX, closestY);
			if (onSegment) {
				p.fill(255, 0, 0);
				p.noStroke();
				p.ellipse(closestX, closestY, 20, 20);
			}
		}

		p.fill(0, 150);
		p.noStroke();
		p.ellipse(cx, cy, r * 2, r * 2);
	};
};

export const LineLine = (container) => (p) => {
	const x2 = 20;
	const y2 = 20;
	let x3, y3, x4, y4;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		x3 = 100;
		y3 = p.height - 100;
		x4 = p.width - 100;
		y4 = 100;
	};

	p.draw = () => {
		p.background(255);
		const x1 = p.mouseX;
		const y1 = p.mouseY;

		const hit = col.lineLine(x1, y1, x2, y2, x3, y3, x4, y4);

		p.strokeWeight(15);
		p.stroke(hit ? [255, 150, 0, 150] : [0, 150, 255, 150]);
		p.line(x3, y3, x4, y4);

		p.stroke(0, 150);
		p.line(x1, y1, x2, y2);

		if (hit) {
			const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
			if (denom !== 0) {
				const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
				const intersectionX = x1 + uA * (x2 - x1);
				const intersectionY = y1 + uA * (y2 - y1);
				p.fill(255, 0, 0);
				p.noStroke();
				p.ellipse(intersectionX, intersectionY, 20, 20);
			}
		}
	};
};

export const LineRect = (container) => (p) => {
	const x2 = 20;
	const y2 = 20;
	const sw = 200;
	const sh = 200;
	let sx, sy;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		sx = p.width / 2 - sw / 2;
		sy = p.height / 2 - sh / 2;
	};

	p.draw = () => {
		p.background(255);
		const x1 = p.mouseX;
		const y1 = p.mouseY;

		const hit = col.lineRect(x1, y1, x2, y2, sx, sy, sw, sh);

		p.noStroke();
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.rect(sx, sy, sw, sh);

		// desenha o ponto vermelho para cada lado atingido do retângulo
		const edges = [
			{ x3: sx, y3: sy, x4: sx, y4: sy + sh },
			{ x3: sx + sw, y3: sy, x4: sx + sw, y4: sy + sh },
			{ x3: sx, y3: sy, x4: sx + sw, y4: sy },
			{ x3: sx, y3: sy + sh, x4: sx + sw, y4: sy + sh }
		];

		p.strokeWeight(15);
		p.stroke(0, 150);
		p.line(x1, y1, x2, y2);

		for (const edge of edges) {
			const { x3, y3, x4, y4 } = edge;
			const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
			if (denom !== 0) {
				const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
				const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
				if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
					const intersectionX = x1 + uA * (x2 - x1);
					const intersectionY = y1 + uA * (y2 - y1);
					p.fill(255, 0, 0);
					p.noStroke();
					p.ellipse(intersectionX, intersectionY, 20, 20);
				}
			}
		}
	};
};

export const PolyPoint = (container) => (p) => {
	const vertices = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.strokeWeight(15);

		vertices.push({ x: p.width / 2 - 100, y: p.height / 2 - 100 });
		vertices.push({ x: p.width / 2 + 100, y: p.height / 2 - 100 });
		vertices.push({ x: p.width / 2 + 50, y: p.height / 2 + 100 });
		vertices.push({ x: p.width / 2 - 50, y: p.height / 2 + 100 });
	};

	p.draw = () => {
		p.background(255);
		const px = p.mouseX;
		const py = p.mouseY;

		const hit = col.polyPoint(vertices, px, py);

		p.noStroke();
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.beginShape();
		for (let v of vertices) {
			p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);

		p.strokeWeight(15);
		p.stroke(0, 150);
		p.point(px, py);
	};
};

export const PolyCircle = (container) => (p) => {
	const r = 30;
	const vertices = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.noStroke();

		vertices.push({ x: p.width / 2 - 100, y: p.height / 2 - 100 });
		vertices.push({ x: p.width / 2 + 100, y: p.height / 2 - 100 });
		vertices.push({ x: p.width / 2 + 50, y: p.height / 2 + 100 });
		vertices.push({ x: p.width / 2 - 50, y: p.height / 2 + 100 });
	};

	p.draw = () => {
		p.background(255);
		const cx = p.mouseX;
		const cy = p.mouseY;

		const hit = col.polyCircle(vertices, cx, cy, r);

		p.noStroke();
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.beginShape();
		for (let v of vertices) {
			p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);

		// desenha o ponto vermelho para a projeção mais próxima em cada aresta do polígono se estiver no segmento
		let next = 0;
		for (let current = 0; current < vertices.length; current++) {
			next = current + 1;
			if (next === vertices.length) next = 0;

			const vc = vertices[current];
			const vn = vertices[next];

			const len = Math.hypot(vc.x - vn.x, vc.y - vn.y);
			if (len !== 0) {
				const dot = (((cx - vc.x) * (vn.x - vc.x)) + ((cy - vc.y) * (vn.y - vc.y))) / Math.pow(len, 2);
				const closestX = vc.x + dot * (vn.x - vc.x);
				const closestY = vc.y + dot * (vn.y - vc.y);
				const onSegment = col.linePoint(vc.x, vc.y, vn.x, vn.y, closestX, closestY);
				if (onSegment) {
					p.fill(255, 0, 0);
					p.noStroke();
					p.ellipse(closestX, closestY, 20, 20);
				}
			}
		}

		p.fill(0, 150);
		p.noStroke();
		p.ellipse(cx, cy, r * 2, r * 2);
	};
};

export const PolyRect = (container) => (p) => {
	const sw = 30;
	const sh = 30;
	const vertices = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.noStroke();

		vertices.push({ x: p.width / 2 - 100, y: p.height / 2 - 100 });
		vertices.push({ x: p.width / 2 + 100, y: p.height / 2 - 100 });
		vertices.push({ x: p.width / 2 + 50, y: p.height / 2 + 100 });
		vertices.push({ x: p.width / 2 - 50, y: p.height / 2 + 100 });
	};

	p.draw = () => {
		p.background(255);
		const sx = p.mouseX;
		const sy = p.mouseY;

		const hit = col.polyRect(sx, sy, sw, sh, vertices);

		p.noStroke();
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.beginShape();
		for (let v of vertices) {
			p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);

		p.fill(0, 150);
		p.rect(sx, sy, sw, sh);
	};
};

export const PolyLine = (container) => (p) => {
	const x2 = 20;
	const y2 = 20;
	const vertices = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.strokeWeight(15);

		const numSides = 16;
		const angle = (Math.PI * 2) / numSides;
		for (let i = 0; i < numSides; i++) {
			const a = angle * i;
			const x = p.width / 2 + Math.cos(a) * 100;
			const y = p.height / 2 + Math.sin(a) * 100;
			vertices.push({ x, y });
		}
	};

	p.draw = () => {
		p.background(255);
		const x1 = p.mouseX;
		const y1 = p.mouseY;

		const hit = col.polyLine(vertices, x1, y1, x2, y2);

		p.noStroke();
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.beginShape();
		for (let v of vertices) {
			p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);

		p.stroke(0, 150);
		p.line(x1, y1, x2, y2);
	};
};

export const PolyPoly = (container) => (p) => {
	const pentagon = [];
	const randomPoly = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.noStroke();

		const angle = (Math.PI * 2) / 5;
		for (let i = 0; i < 5; i++) {
			const a = angle * i;
			pentagon.push({
				x: p.width / 2 + Math.cos(a) * 100,
				y: p.height / 2 + Math.sin(a) * 100
			});
		}

		let a = 0;
		while (a < 360) {
			const rad = (a * Math.PI) / 180;
			const r = p.random(30, 50);
			randomPoly.push({
				x: Math.cos(rad) * r,
				y: Math.sin(rad) * r
			});
			a += p.random(15, 40);
		}
	};

	p.draw = () => {
		p.background(255);

		const mouseX = p.mouseX;
		const mouseY = p.mouseY;
		const diffX = mouseX - randomPoly[0].x;
		const diffY = mouseY - randomPoly[0].y;

		const movedPoly = randomPoly.map((v) => ({
			x: v.x + diffX,
			y: v.y + diffY
		}));

		const hit = col.polyPoly(pentagon, movedPoly);

		p.noStroke();
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.beginShape();
		for (let v of pentagon) {
			p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);

		p.fill(0, 150);
		p.beginShape();
		for (let v of movedPoly) {
			p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);
	};
};

export const TriPoint = (container) => (p) => {
	let x1, y1, x2, y2, x3, y3;

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();
		p.strokeWeight(15);

		x1 = p.width / 2;
		y1 = 100;
		x2 = p.width / 2 + 150;
		y2 = p.height - 100;
		x3 = p.width / 2 - 150;
		y3 = p.height - 100;
	};

	p.draw = () => {
		p.background(255);
		const px = p.mouseX;
		const py = p.mouseY;

		const hit = col.triPoint(px, py, x1, y1, x2, y2, x3, y3);

		p.noStroke();
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.triangle(x1, y1, x2, y2, x3, y3);

		p.strokeWeight(15);
		p.stroke(0, 150);
		p.point(px, py);
	};
};

export const ObjectOrientedCollision = (container) => (p) => {
	class CircleObj {
		constructor(r) {
			this.x = 0;
			this.y = 0;
			this.r = r;
		}

		update() {
			this.x = p.mouseX;
			this.y = p.mouseY;
		}

		display() {
			p.fill(0, 150);
			p.noStroke();
			p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
		}
	}

	class RectObj {
		constructor(x, y, w, h) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.hit = false;
		}

		checkCollision(circle) {
			this.hit = col.circleRect(
				circle.x,
				circle.y,
				circle.r,
				this.x,
				this.y,
				this.w,
				this.h
			);
		}

		display() {
			p.fill(this.hit ? [255, 150, 0] : [0, 150, 255]);
			p.noStroke();
			p.rect(this.x, this.y, this.w, this.h);
		}
	}

	let circle;
	let rects = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);
		p.noCursor();

		circle = new CircleObj(30);
		for (let i = 0; i < 8; i++) {
			const x = Math.floor(p.random(50, p.width - 50) / 50) * 50;
			const y = Math.floor(p.random(50, p.height - 50) / 50) * 50;
			rects.push(new RectObj(x, y, 50, 50));
		}
	};

	p.draw = () => {
		p.background(255);
		circle.update();

		for (let r of rects) {
			r.checkCollision(circle);
			r.display();
		}

		circle.display();
	};
};

export const MatrixTransformations = (container) => (p) => {
	let square1 = [];
	let square2 = [];
	let angle = 0;
	let s1x, s1y;
	let isDragging = false;
	let dragOffsetX = 0;
	let dragOffsetY = 0;
	let square1Screen = [];

	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 400);

		const scaleFactor = w / 600;
		const r1 = 50 * scaleFactor;
		const r2 = 100 * scaleFactor;

		square1 = [
			{ x: -r1, y: -r1 },
			{ x: r1, y: -r1 },
			{ x: r1, y: r1 },
			{ x: -r1, y: r1 }
		];

		square2 = [
			{ x: -r2, y: -r2 },
			{ x: r2, y: -r2 },
			{ x: r2, y: r2 },
			{ x: -r2, y: r2 }
		];

		s1x = p.width / 3;
		s1y = p.height / 2;
	};

	p.mousePressed = () => {
		if (col.polyPoint(square1Screen, p.mouseX, p.mouseY)) {
			isDragging = true;
			dragOffsetX = s1x - p.mouseX;
			dragOffsetY = s1y - p.mouseY;
		}
	};

	p.mouseDragged = () => {
		if (isDragging) {
			s1x = p.mouseX + dragOffsetX;
			s1y = p.mouseY + dragOffsetY;
		}
	};

	p.mouseReleased = () => {
		isDragging = false;
	};

	p.draw = () => {
		p.background(255);

		// atualiza o ângulo de rotação
		angle += 0.02;

		// Posição fixa do segundo quadrado (azul/laranja)
		const s2x = p.width - p.width / 3;
		const s2y = p.height / 2;

		// Converte os pontos para coordenadas reais de tela e testa a colisão
		square1Screen = pointsToScreenCoords(square1, s1x, s1y, angle);
		const square2Screen = pointsToScreenCoords(square2, s2x, s2y, angle);
		const hit = col.polyPoly(square1Screen, square2Screen);

		// 1. Desenha o segundo quadrado (alvo fixo) PRIMEIRO
		p.push();
		p.translate(s2x, s2y);
		p.rotate(angle);
		p.fill(hit ? [255, 150, 0] : [0, 150, 255]);
		p.noStroke();
		p.beginShape();
		for (let pt of square2) {
			p.vertex(pt.x, pt.y);
		}
		p.endShape(p.CLOSE);
		p.pop();

		// 2. Desenha o primeiro quadrado (cinza interativo) SEGUNDO para efeito semitransparente por cima
		p.push();
		p.translate(s1x, s1y);
		p.rotate(angle);
		p.fill(0, 150);
		p.noStroke();
		p.beginShape();
		for (let pt of square1) {
			p.vertex(pt.x, pt.y);
		}
		p.endShape(p.CLOSE);
		p.pop();

		// Cursor visual ao passar o mouse ou arrastar o quadrado menor
		const hovering = col.polyPoint(square1Screen, p.mouseX, p.mouseY);
		if (isDragging) {
			p.cursor('grabbing');
		} else if (hovering) {
			p.cursor('grab');
		} else {
			p.cursor(p.ARROW);
		}
	};

	function pointsToScreenCoords(points, tx, ty, rotAngle) {
		const cosA = Math.cos(rotAngle);
		const sinA = Math.sin(rotAngle);
		return points.map((pt) => ({
			x: tx + pt.x * cosA - pt.y * sinA,
			y: ty + pt.x * sinA + pt.y * cosA
		}));
	}
};

export const DotProduct = (container) => (p) => {
	p.setup = () => {
		const w = getCanvasWidth(container);
		p.createCanvas(w, 250);
	};

	p.draw = () => {
		p.background(255);

		// Centro
		const v0 = p.createVector(p.width / 4, p.height / 2);

		// Vetor preto (v1) apontando para a direita
		const v1 = p.createVector(p.width / 2, 0);

		// Vetor azul (v2) seguindo o mouse
		const v2 = p.createVector(p.mouseX - v0.x, p.mouseY - v0.y);

		// Exibe o produto escalar como proporção ao longo do segmento (0 a 1)
		const lenSq = v1.magSq();
		const dot = lenSq !== 0 ? v2.dot(v1) / lenSq : 0;
		const onSegment = dot >= 0 && dot <= 1;

		// Ponto de projeção: se sobre o segmento, para na reta (v0.y); se fora, "cai no vazio" além da altura do canvas
		const px = p.mouseX;
		const py = onSegment ? v0.y : (p.mouseY <= v0.y ? p.height * 2 : -p.height * 2);

		// Linha tracejada da ponta do vetor (mouse) até o ponto P ou caindo fora dos limites do canvas
		drawDashedLine(p.mouseX, p.mouseY, px, py);

		// Desenha os vetores
		drawArrow(v0, v1, 'black');
		drawArrow(v0, v2, [0, 150, 255]);

		// Desenha o ponto P visível apenas enquanto contido nos confins do segmento de reta
		if (onSegment) {
			p.fill(255, 150, 0);
			p.noStroke();
			p.circle(px, py, 8);
			p.fill(0);
			p.textSize(13);
			p.textStyle(p.BOLD);
			p.text('P', px - 4, py + (p.mouseY < v0.y ? 16 : -8));
			p.textStyle(p.NORMAL);
		}

		// Valor numérico de dot
		p.noStroke();
		p.fill(onSegment ? 0 : 255, 0, 0);
		p.textSize(16);
		p.text(`dot = ${dot.toFixed(2)}`, 15, p.height - 15);
	};

	function drawArrow(base, vec, myColor) {
		p.push();
		p.stroke(myColor);
		p.strokeWeight(3);
		p.fill(myColor);
		p.translate(base.x, base.y);
		p.line(0, 0, vec.x, vec.y);
		p.rotate(vec.heading());
		const arrowSize = 7;
		p.translate(vec.mag() - arrowSize, 0);
		p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
		p.pop();
	}

	function drawDashedLine(x1, y1, x2, y2) {
		p.push();
		p.stroke(180);
		p.strokeWeight(1.5);
		p.drawingContext.setLineDash([5, 5]);
		p.line(x1, y1, x2, y2);
		p.drawingContext.setLineDash([]);
		p.pop();
	}
};
