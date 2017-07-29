import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import Sketch from 'sketch-js'


// ----------------------------------------
// Particle
// ----------------------------------------
const Particle = function ( x, y, radius ) {
  this.init( x, y, radius );
};

Particle.prototype = {

  init: function( x, y, radius ) {

    this.alive = true;

    this.radius = radius || 10;
    this.wander = 0.15;
    this.theta = random( TWO_PI );
    this.drag = 0.92;
    this.color = '#fff';

    this.x = x || 0.0;
    this.y = y || 0.0;

    this.vx = 0.0;
    this.vy = 0.0;
  },

  move: function() {

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.drag;
    this.vy *= this.drag;

    this.theta += random( -0.5, 0.5 ) * this.wander;
    this.vx += sin( this.theta ) * 0.1;
    this.vy += cos( this.theta ) * 0.1;

    this.radius *= 0.96;
    this.alive = this.radius > 0.5;
  },

  draw: function( ctx ) {

    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

class ParticleContainer extends Component {

  componentDidMount = () => {

    // ----------------------------------------
    // Example
    // ----------------------------------------

    const MAX_PARTICLES = 280;
    const COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

    const particles = [];
    const pool = [];

    const demo = Sketch.create({
      container: this.container
    });

    demo.setup = function() {

      // Set off some initial particles.
      let i, x, y;

      for ( i = 0; i < 20; i++ ) {
        x = ( demo.width * 0.5 ) + random( -100, 100 );
        y = ( demo.height * 0.5 ) + random( -100, 100 );
        demo.spawn( x, y );
      }
    };

    demo.spawn = function( x, y ) {

      if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );

      const particle = pool.length ? pool.pop() : new Particle();
      particle.init( x, y, random( 5, 40 ) );

      particle.wander = random( 0.5, 2.0 );
      particle.color = random( COLOURS );
      particle.drag = random( 0.9, 0.99 );

      const theta = random( TWO_PI );
      const force = random( 2, 8 );

      particle.vx = sin( theta ) * force;
      particle.vy = cos( theta ) * force;

      particles.push( particle );
    };

    demo.update = function() {

      let i, particle;

      for ( i = particles.length - 1; i >= 0; i-- ) {

        particle = particles[i];

        if ( particle.alive ) particle.move();
        else pool.push( particles.splice( i, 1 )[0] );
      }
    };

    demo.draw = function() {

      demo.globalCompositeOperation  = 'lighter';

      for ( var i = particles.length - 1; i >= 0; i-- ) {
        particles[i].draw( demo );
      }
    };

    demo.mousemove = function() {

      var particle, theta, force, touch, max, i, j, n;

      for ( i = 0, n = demo.touches.length; i < n; i++ ) {

        touch = demo.touches[i], max = random( 1, 4 );
        for ( j = 0; j < max; j++ ) {
          demo.spawn( touch.x, touch.y );
        }

      }
    };
  };

  render () {

    return (
      <div className={css(styles.container)} ref={ref => this.container = ref}/>

    )
  }
}



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#222'
  }
});


export default ParticleContainer;