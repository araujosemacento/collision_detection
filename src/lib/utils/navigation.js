export const chapters = [
	{ slug: 'index', title: 'Introdução', sketch: 'Introduction' },
	{ slug: 'table_of_contents', title: 'Sumário', sketch: null },
	{ slug: 'license', title: 'Licença', sketch: null },
	{ slug: 'what_you_should_already_know', title: 'O Que Você Precisa Saber', sketch: null },
	{ slug: 'ai_usage', title: 'Autoria & Uso de Inteligência Artificial', sketch: null },
	{ slug: 'point-point', title: 'Ponto / Ponto', sketch: 'PointPoint' },
	{ slug: 'point-circle', title: 'Ponto / Círculo', sketch: 'PointCircle' },
	{ slug: 'circle-circle', title: 'Círculo / Círculo', sketch: 'CircleCircle' },
	{ slug: 'section_1_challenges', title: 'Desafios: Seção 1', sketch: null },
	{ slug: 'point-rect', title: 'Ponto / Retângulo', sketch: 'PointRect' },
	{ slug: 'rect-rect', title: 'Retângulo / Retângulo', sketch: 'RectRect' },
	{ slug: 'circle-rect', title: 'Círculo / Retângulo', sketch: 'CircleRect' },
	{ slug: 'section_2_challenges', title: 'Desafios: Seção 2', sketch: null },
	{ slug: 'line-point', title: 'Linha / Ponto', sketch: 'LinePoint' },
	{ slug: 'line-circle', title: 'Linha / Círculo', sketch: 'LineCircle' },
	{ slug: 'line-line', title: 'Linha / Linha', sketch: 'LineLine' },
	{ slug: 'line-rect', title: 'Linha / Retângulo', sketch: 'LineRect' },
	{ slug: 'section_3_challenges', title: 'Desafios: Seção 3', sketch: null },
	{ slug: 'poly-point', title: 'Polígono / Ponto', sketch: 'PolyPoint' },
	{ slug: 'poly-circle', title: 'Polígono / Círculo', sketch: 'PolyCircle' },
	{ slug: 'poly-rect', title: 'Polígono / Retângulo', sketch: 'PolyRect' },
	{ slug: 'poly-line', title: 'Polígono / Linha', sketch: 'PolyLine' },
	{ slug: 'poly-poly', title: 'Polígono / Polígono', sketch: 'PolyPoly' },
	{ slug: 'section_4_challenges', title: 'Desafios: Seção 4', sketch: null },
	{ slug: 'tri-point', title: 'Triângulo / Ponto', sketch: 'TriPoint' },
	{ slug: 'where_are_the_other_triangle_examples', title: 'Outros Exemplos de Triângulo', sketch: null },
	{ slug: 'section_5_challenges', title: 'Desafios: Seção 5', sketch: null },
	{ slug: 'object_oriented_collision', title: 'Colisão Orientada a Objetos', sketch: 'ObjectOrientedCollision' },
	{ slug: 'matrix_transformations', title: 'Transformações de Matrizes', sketch: 'MatrixTransformations' },
	{ slug: 'thanks', title: 'Agradecimentos', sketch: null },
	{ slug: 'bonus_chapters', title: 'Capítulos Bônus', sketch: null },
	{ slug: 'bonus-dot_product', title: 'Bônus - Produto Escalar', sketch: null }
];

export function getChapterInfo(slug) {
	const index = chapters.findIndex((c) => c.slug === slug);
	if (index === -1) return null;
	return {
		current: chapters[index],
		prev: index > 0 ? chapters[index - 1] : null,
		next: index < chapters.length - 1 ? chapters[index + 1] : null,
		index: index + 1,
		total: chapters.length
	};
}
