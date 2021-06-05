#include <begin_vertex>

// 在beginnormal_vertex中已经计算
// float angle = (transformed.y + uTime) * 0.9;
// mat2 rotateMatrix = get2dRotateMatrix(angle);

transformed.xz = rotateMatrix * transformed.xz;
