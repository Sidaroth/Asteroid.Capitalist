// TODO: Consider different tint colors. If we want to achieve white (0xffffff) we need to apply another method.
// as tint = 0xffffff equals no tint. Options are custom pipeline, using the sprite as a mask over a white image, https://www.html5gamedevs.com/topic/18254-spritetint-white-color-problem/
const takeDamageTween = (target, scene) => {
    target.tint = 0xD50000;
    const tweenConf = {
        targets: target,
        alpha: { from: 1, to: 0.5 },
        ease: 'Linear',
        duration: 75,
        repeat: 0,
        yoyo: true,
        onComplete: () => {
            target.tint = undefined;
        },
    };
    scene.tweens.add(tweenConf);
};

export default takeDamageTween;
