const expirationTween = (target, scene, duration, repeat = 0) => {
    const tweenConf = {
        targets: target,
        alpha: { from: 1, to: 0 },
        yoyo: true,
        ease: 'linear',
        duration,
        repeat,
    };
    scene.tweens.add(tweenConf);
};

export default expirationTween;
