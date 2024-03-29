/* eslint-disable camelcase */
import common from '../../common.glsl';
import begin_vertex from './begin_vertex.glsl';

export default function vertex(vertexShader) {
  return vertexShader
    .replace('#include <begin_vertex>', begin_vertex)
    .replace('#include <common>', common);
}
