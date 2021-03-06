import { Anim, Draw, Preload, Sound, Elements } from 'evolve-js';

import Core from '../Core';
import Transition from '../Transition';

/**
 * A transition effect to fade-in the new scene.
 *
 * ## Usage example
 *
 *     var game = new tine.Game(null, {
 *       create: function() {
 *         var transition = new tine.transitions.FadeIn(null, 1000);
 *         game.replace(new MyScene(), transition);
 *       }
 *     });
 *
 * @class FadeInOut
 * @constructor
 * @param {Function} [ease=createjs.Ease.linear] An easing function from 
 *                   `createjs.Ease` (provided by TweenJS).
 * @param {Number} [duration=400] The transition time in milliseconds.
**/
export default class FadeInOut extends Transition {
  startTransition(resolve) {
    return new Promise((resolve, reject) => {
      const halfDuration = this.duration * 0.5;

      this.endOutOptions = this.startInOptions = {
        alpha: 0,
      };

      this.endInOptions = {
        alpha: this.in.alpha,
      }


      this.startOutOptions = {
        alpha: this.out.alpha,
      }

      this.in.inherit(this.startInOptions).animate({ override: true, delay: halfDuration }, this.endInOptions, halfDuration, this.ease).then(() => {
        resolve();
      });

      this.out.inherit(this.startOutOptions).animate({ override: true }, this.endOutOptions, halfDuration, this.ease);
    });
  }

  endTransition() {
    return new Promise((resolve, reject) => {
      this.in.inherit(this.endInOptions);

      this.out.inherit(this.startOutOptions);

      resolve();
    });
  }
}
