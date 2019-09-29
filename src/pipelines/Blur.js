import Phaser from 'phaser';

const Blur = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function Blur(game) {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;
            varying vec2 outTexCoord;
            varying vec4 vColor;
            uniform float blur;
            uniform sampler2D uSampler;
            
            void main(void) {
            
                vec4 sum = vec4(0.0);
            
                sum += texture2D(uSampler, vec2(outTexCoord.x - 4.0*blur, outTexCoord.y - 4.0*blur)) * 0.05;
                sum += texture2D(uSampler, vec2(outTexCoord.x - 3.0*blur, outTexCoord.y - 3.0*blur)) * 0.09;
                sum += texture2D(uSampler, vec2(outTexCoord.x - 2.0*blur, outTexCoord.y - 2.0*blur)) * 0.12;
                sum += texture2D(uSampler, vec2(outTexCoord.x - blur, outTexCoord.y - blur)) * 0.15;
                sum += texture2D(uSampler, vec2(outTexCoord.x, outTexCoord.y)) * 0.16;
                sum += texture2D(uSampler, vec2(outTexCoord.x + blur, outTexCoord.y + blur)) * 0.15;
                sum += texture2D(uSampler, vec2(outTexCoord.x + 2.0*blur, outTexCoord.y + 2.0*blur)) * 0.12;
                sum += texture2D(uSampler, vec2(outTexCoord.x + 3.0*blur, outTexCoord.y + 3.0*blur)) * 0.09;
                sum += texture2D(uSampler, vec2(outTexCoord.x + 4.0*blur, outTexCoord.y + 4.0*blur)) * 0.05;
            
                gl_FragColor = sum;
            }`,
        });
    },
});

export default Blur;
