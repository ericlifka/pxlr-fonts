var SM = { };

/* new class style for v2:

// note: no base class, mixin only based code sharing
DefineClass([mixin_one, mixin_two, ..., {
  constructor: function () {},

  normalFunction: function () {},

  chainableEvent: SM.event(function () {

  })
}]);

implicit function :
  trigger: function (event, ...arguments);
    - used to trigger events on objects, masks how the event is implemented and where, and calls it on the right context
 */

//--- CLASSES ---//
(function () {
  function BaseClass() { }
  BaseClass.prototype.trigger = function (eventName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var event = this[ eventName ];

    if (event) {
      if (event.isSMEventWrapper) {
        event.trigger(this, args);
      } else {
        throw new Error("Tried to call trigger on a non event property or function");
      }
    }
  };

  function EventWrapper() { }
  EventWrapper.prototype = [];
  EventWrapper.prototype.isSMEventWrapper = true;
  EventWrapper.prototype.trigger = function (context, args) {
    this.forEach(function (event) {
      event.apply(context, args);
    });
  };

  SM.event = function (fn) {
    fn.isSMEvent = true;
    return fn;
  };

  SM.DefineClass = function (mixins) {
    mixins = mixins || [];

    function Constructor() {
      if (typeof this.constructor === "function") {
        this.constructor.apply(this, arguments);
      }

      this.trigger('init');
    }
    Constructor.prototype = new BaseClass();
    var proto = Constructor.prototype;

    mixins.forEach(function (mixin) {
      if (typeof mixin === "function" && mixin.prototype) {
        mixin = mixin.prototype;
      }

      Object.keys(mixin).forEach(function (name) {
        var fn = mixin[ name ];

        if (fn.isSMEvent) {

          if (!proto[ name ]) {
            proto[ name ] = new EventWrapper();
          }

          if (proto[ name ].isSMEventWrapper) {
            proto[ name ].push(fn);
          } else {
            throw new Error('Error Creating class: cannot mix SM events and regular functions on the same name key: "' + name + '"');
          }

        } else {

          if (!proto[ name ] || !proto[ name ].isSMEventWrapper) {
            proto[ name ] = fn;
          } else {
            throw new Error('Error Creating class: cannot mix SM events and regular functions on the same name key: "' + name + '"');
          }

        }
      });
    });

    return Constructor
  };
}());

//--- MODULES ---//
(function () {
  var moduleDefinitions = {};
  var evaluatedModules = {};
  var evaluationStack = [];

  function require(moduleName) {
    if (evaluationStack.indexOf(moduleName) > -1) {
      throw "Circular dependencies not supported: " + moduleName + " required while still being evaluated";
    }

    var module = evaluatedModules[ moduleName ];
    if (module) {
      return module;
    }

    var moduleDefinition = moduleDefinitions[ moduleName ];
    if (moduleDefinition) {
      evaluationStack.push(moduleName);
      module = evaluatedModules[ moduleName ] = moduleDefinition(require);
      evaluationStack.pop();

      return module;
    }

    throw "No module found: " + moduleName;
  }

  SM.DefineModule = function (moduleName, moduleDefinition) {
    if (moduleDefinitions[ moduleName ]) {
      throw "Duplicate module definition: " + moduleName;
    }

    moduleDefinitions[ moduleName ] = moduleDefinition;
  };

  function hardReset() {
    moduleDefinitions = {};
    evaluatedModules = {};
    evaluationStack = [];
  }

  function runMain() {
    require('main');
  }

  if (typeof module !== 'undefined' && module.exports) {

    /* Node.js context: provide module internals for testing */
    module.exports = SM;
    module.exports.runMain = runMain;
    module.exports.hardReset = hardReset;

  } else {

    /* Browser context: tie into load to run main */
    if (document.readyState !== 'loading') {
      setTimeout(runMain, 0);
    } else {
      document.addEventListener('DOMContentLoaded', runMain);
    }

  }

}());

(function () {
/* start:pxlr-core */
SM.DefineModule('pxlr/core', function () {
    return {
        name: "pxlr-core",
        information: "Backbone utilities and core classes of pxlr"
    };
});

/* provide namespace backwards compatibility for v1 */
SM.DefineModule('models/animation', function (require) {
    return require('pxlr/core/animation');
});
SM.DefineModule('models/cell-grid', function (require) {
    return require('pxlr/core/cell-grid');
});
SM.DefineModule('models/sprite', function (require) {
    return require('pxlr/core/sprite');
});
SM.DefineModule('models/sprite-group', function (require) {
    return require('pxlr/core/sprite-group');
});

SM.DefineModule('pxlr/core/animation', function () {
    return SM.DefineClass([{
        finished: false,
        constructor: function (options) {
            this.frames = options.frames;
            this.millisPerFrame = options.millisPerFrame || 100;
            this.currentFrame = options.offsetIndex || 0;
            this.loop = options.loop;

            this.width = this.frames[ 0 ].width;
            this.height = this.frames[ 0 ].height;
            this.millisEllapsedOnFrame = 0;
        },
        update: function (dtime) {
            if (this.finished) return;

            this.millisEllapsedOnFrame += dtime;

            if (this.millisEllapsedOnFrame >= this.millisPerFrame) {
                this.millisEllapsedOnFrame -= this.millisPerFrame;
                this.currentFrame += 1;

                if (this.currentFrame >= this.frames.length) {
                    if (this.loop) {
                        this.currentFrame = 0;
                    }
                    else {
                        this.finished = true;
                    }
                }
            }
        },
        renderToFrame: function (frame, x, y, index) {
            if (this.finished) return;

            this.frames[ this.currentFrame ].renderToFrame(frame, x, y, index);
        }
    }]);
});

SM.DefineModule('pxlr/core/cell-grid', function () {
    return SM.DefineClass([{
        iterateCells: function (handler) {
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    handler(this.cells[ x ][ y ], x, y);
                }
            }
        },
        cellAt: function (x, y) {
            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                return this.cells[ x ][ y ];
            }
            else {
                return { x: -1, y: -1, color: "#000000", index: -1 };
            }
        }
    }]);
});

SM.DefineModule('pxlr/core/sprite-group', function () {
    return SM.DefineClass([{
        constructor: function (sprites) {
            this.spriteDescriptors = sprites || [];

            this.width = Math.max.apply(null, this.spriteDescriptors.map(function (descriptor) {
                return descriptor.x + descriptor.sprite.width;
            }));

            this.height = Math.max.apply(null, this.spriteDescriptors.map(function (descriptor) {
                return descriptor.y + descriptor.sprite.height;
            }));
        },

        update: function (dtime) {
            var finished = true;

            this.spriteDescriptors.forEach(function (descriptor) {
                descriptor.sprite.update(dtime);

                if (!descriptor.sprite.finished) {
                    finished = false;
                }
            });

            this.finished = finished;
        },

        renderToFrame: function (frame, x, y, index) {
            this.spriteDescriptors.forEach(function (descriptor) {
                descriptor.sprite.renderToFrame(
                    frame,
                    x + descriptor.x,
                    y + descriptor.y,
                    index
                );
            });
        }
    }]);
});

SM.DefineModule('pxlr/core/sprite', function (require) {
    var CellGrid = require('pxlr/core/cell-grid');

    // This variable is for the clone function to have a reference to the constructor
    var Sprite = SM.DefineClass([CellGrid, {
        finished: true,
        constructor: function (pixels, meta) {
            this.meta = meta || {};
            this.width = pixels.length;
            this.height = pixels[ 0 ].length;
            this.offsetAdjustment = { x: 0, y: 0 };

            this.cells = [];
            for (var x = 0; x < this.width; x++) {
                this.cells[ x ] = [];
                for (var y = 0; y < this.height; y++) {
                    this.cells[ x ][ y ] = {
                        x: x,
                        y: y,
                        color: pixels[ x ][ y ]
                    };
                }
            }
        },
        setPermanentOffset: function (offset) {
            offset = offset || { };
            this.offsetAdjustment.x = offset.x || 0;
            this.offsetAdjustment.y = offset.y || 0;

            return this;
        },
        applyColor: function (color) {
            this.iterateCells(function (cell) {
                if (cell.color) {
                    cell.color = color;
                }
            });

            return this;
        },
        update: function (dtime) {
            /*
             sprites ignore updates by default, but accept the event
             so that the api signature of sprites and animations matches
             */
        },
        renderToFrame: function (frame, x, y, index) {
            index = index || 0;
            var offset_x = this.offsetAdjustment.x;
            var offset_y = this.offsetAdjustment.y;
            this.iterateCells(function (cell, _x, _y) {
                if (cell.color) {
                    var frameCell = frame.cellAt(x + _x + offset_x, y + _y + offset_y);
                    if (index >= frameCell.index) {
                        frameCell.color = cell.color;
                        frameCell.index = index;
                    }
                }
            });
        },
        clone: function () {
            var colorGrid = [];
            for (var x = 0; x < this.width; x++) {
                colorGrid[ x ] = [];
                for (var y = 0; y < this.height; y++) {
                    colorGrid[ x ][ y ] = this.cells[ x ][ y ].color;
                }
            }

            var sprite = new Sprite(colorGrid);
            sprite.setPermanentOffset(this.offsetAdjustment);

            return sprite;
        },
        rotateLeft: function () {
            var width = this.width;
            var height = this.height;
            var oldCells = this.cells;
            var newCells = [];
            var x, y;

            for (x = 0; x < height; x++) {
                newCells[ x ] = [];
            }

            for (x = 0; x < width; x++) {
                for (y = 0; y < height; y++) {
                    newCells[ y ][ width - x - 1 ] = {
                        x: y,
                        y: width - x - 1,
                        color: oldCells[ x ][ y ].color
                    };
                }
            }

            this.width = height;
            this.height = width;
            this.cells = newCells;
            return this;
        },
        rotateRight: function () {
            return this
                .rotateLeft()
                .rotateLeft()
                .rotateLeft();
        },
        invertX: function () {
            for (var x = 0; x < this.width / 2; x++) {
                var left = this.cells[ x ];
                var right = this.cells[ this.width - x - 1 ];
                this.cells[ x ] = right;
                this.cells[ this.width - x - 1 ] = left;
            }
            return this;
        },
        invertY: function () {
            for (var x = 0; x < this.width; x++) {
                this.cells[ x ].reverse();
            }
            return this;
        }
    }]);

    return Sprite;
});
/* end:pxlr-core */
}());

(function () {
/* start:pxlr-gl */
SM.DefineModule('pxlr/gl', function () {
  return {
    name: "pxlr-gl",
    information: "Rendering pipeline for pxlr"
  }
});

SM.DefineModule('views/canvas-renderer', function (require) {
  return require('pxlr/gl/canvas');
});

SM.DefineModule('pxlr/gl/canvas', function (require) {
  var Frame = require('pxlr/gl/frame');

  function maximumPixelSize(width, height) {
    var maxWidth = window.innerWidth;
    var maxHeight = window.innerHeight;
    var pixelSize = 1;
    while (true) {
      if (width * pixelSize > maxWidth ||
        height * pixelSize > maxHeight) {

        pixelSize--;
        break;
      }

      pixelSize++;
    }

    if (pixelSize <= 0) {
      pixelSize = 1;
    }

    return pixelSize;
  }

  function createCanvasEl(dimensions) {
    dimensions.fullWidth = dimensions.width * dimensions.pixelSize;
    dimensions.fullHeight = dimensions.height * dimensions.pixelSize;

    var el = document.createElement('canvas');
    el.width = dimensions.fullWidth;
    el.height = dimensions.fullHeight;
    el.classList.add('pixel-engine-canvas');

    return el;
  }

  return SM.DefineClass([{
    width: 80,
    height: 50,
    pixelSize: 1,
    nextFrame: 0,

    constructor: function (options) {
      options = options || {};

      this.width = options.width || this.width;
      this.height = options.height || this.height;
      this.pixelSize = maximumPixelSize(this.width, this.height);

      this.container = options.container || document.body;
      this.canvas = createCanvasEl(this);
      this.container.appendChild(this.canvas);

      this.canvasDrawContext = this.canvas.getContext("2d", { alpha: false });
      this.frames = [
        new Frame(this),
        new Frame(this)
      ];
    },

    newRenderFrame: function () {
      return this.frames[ this.nextFrame ];
    },
    renderFrame: function () {
      var frame = this.frames[ this.nextFrame ];
      var pixelSize = this.pixelSize;
      var ctx = this.canvasDrawContext;
      var fillColor = frame.fillColor;

      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, this.fullWidth, this.fullHeight);

      frame.iterateCells(function (cell, x, y) {
        if (cell.color !== fillColor) {
          ctx.beginPath();
          ctx.rect(cell.render_x, cell.render_y, pixelSize, pixelSize);
          ctx.fillStyle = cell.color;
          ctx.fill();
          ctx.closePath();
        }
      });

      this.nextFrame = +!this.nextFrame; // switch the frames
    },
    setFillColor: function (fillColor) {
      this.frames.forEach(function (frame) {
        frame.setFillColor(fillColor);
      });
    }
  }]);
});

SM.DefineModule('pxlr/gl/frame', function (require) {
  var CellGrid = require('pxlr/core/cell-grid');

  return SM.DefineClass([CellGrid, {
    constructor: function (dimensions) {
      this.width = dimensions.width;
      this.height = dimensions.height;
      this.cells = [];

      for (var x = 0; x < this.width; x++) {
        this.cells[ x ] = [];

        for (var y = 0; y < this.height; y++) {
          this.cells[ x ][ y ] = {
            x: x,
            y: y,
            render_x: x * dimensions.pixelSize,
            render_y: y * dimensions.pixelSize,
            color: "#000000",
            index: -1
          };
        }
      }
    },
    clear: function () {
      var color = this.fillColor;
      if (color) {
        this.iterateCells(function (cell) {
          cell.color = color;
          cell.index = -1;
        });
      }
    },
    setFillColor: function (fillColor) {
      this.fillColor = fillColor;
    }
  }]);
});

SM.DefineModule('pxlr/gl/webgl', function (require) {
  var Frame = require('pxlr/gl/frame');

  function maximumPixelSize(width, height) {
    var maxWidth = window.innerWidth;
    var maxHeight = window.innerHeight;
    var pixelSize = 1;
    while (true) {
      if (width * pixelSize > maxWidth ||
        height * pixelSize > maxHeight) {

        pixelSize--;
        break;
      }

      pixelSize++;
    }

    if (pixelSize <= 0) {
      pixelSize = 1;
    }

    return pixelSize;
  }

  function createCanvasEl(dimensions) {
    dimensions.fullWidth = dimensions.width * dimensions.pixelSize;
    dimensions.fullHeight = dimensions.height * dimensions.pixelSize;

    var el = document.createElement('canvas');
    el.width = dimensions.fullWidth;
    el.height = dimensions.fullHeight;
    el.classList.add('pixel-engine-canvas');

    return el;
  }

  var horizAspect = 480.0/640.0;

  function loadIdentity() {
    mvMatrix = Matrix.I(4);
  }

  function multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
  }

  function mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
  }

  function setMatrixUniforms() {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  }

  function drawScene(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

    loadIdentity();
    mvTranslate([-0.0, 0.0, -6.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function initBuffers(gl) {
    squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    var vertices = [
      1.0,  1.0,  0.0,
      -1.0, 1.0,  0.0,
      1.0,  -1.0, 0.0,
      -1.0, -1.0, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  }

  function getShader(gl, id) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
      return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while (currentChild) {
      if (currentChild.nodeType == currentChild.TEXT_NODE) {
        theSource += currentChild.textContent;
      }

      currentChild = currentChild.nextSibling;
    }

    if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      // Unknown shader type
      return null;
    }

    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  function initShaders(gl) {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    // Create the shader program

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
  }

  return SM.DefineClass({
    width: 80,
    height: 50,
    pixelSize: 1,
    nextFrame: 0,

    constructor: function Renderer(options) {
      options = options || {};

      this.width = options.width || this.width;
      this.height = options.height || this.height;
      this.pixelSize = maximumPixelSize(this.width, this.height);

      this.container = options.container || document.body;
      this.canvas = createCanvasEl(this);
      this.container.appendChild(this.canvas);

      this.canvasDrawContext = this.canvas.getContext("webgl");
      this.canvasDrawContext.clearColor(0.0, 0.0, 0.0, 1.0);
      this.canvasDrawContext.enable(this.canvasDrawContext.DEPTH_TEST);
      this.canvasDrawContext.depthFunc(this.canvasDrawContext.LEQUAL);
      this.canvasDrawContext.clear(this.canvasDrawContext.COLOR_BUFFER_BIT | this.canvasDrawContext.DEPTH_BUFFER_BIT);

      this.frames = [
        new Frame(this),
        new Frame(this)
      ];
    },

    newRenderFrame: function () {
      return this.frames[ this.nextFrame ];
    },
    renderFrame: function () {
      //var frame = this.frames[ this.nextFrame ];
      //var pixelSize = this.pixelSize;
      //var ctx = this.canvasDrawContext;
      //var fillColor = frame.fillColor;
      //
      //ctx.fillStyle = fillColor;
      //ctx.fillRect(0, 0, this.fullWidth, this.fullHeight);
      //
      //frame.iterateCells(function (cell, x, y) {
      //    if (cell.color !== fillColor) {
      //        ctx.beginPath();
      //        ctx.rect(cell.render_x, cell.render_y, pixelSize, pixelSize);
      //        ctx.fillStyle = cell.color;
      //        ctx.fill();
      //        ctx.closePath();
      //    }
      //});
      //
      //this.nextFrame = +!this.nextFrame; // switch the frames
    },
    setFillColor: function (fillColor) {
      this.frames.forEach(function (frame) {
        frame.setFillColor(fillColor);
      });
    }
  });
});
/* end:pxlr-gl */
}());

SM.DefineModule('pxlr/fonts/arcade-small', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;

    return {
        meta: {
            width: 3,
            height: 5,
            lineHeight: 8,
            letterSpacing: 1,
            credit: "me"
        },
        A: new Sprite([
            [ n, w, w, w, w ],
            [ w, n, w, n, n ],
            [ n, w, w, w, w ]
        ]),
        B: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, w ],
            [ n, w, n, w, n ]
        ]),
        C: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ n, w, n, w, n ]
        ]),
        D: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, n, n, w ],
            [ n, w, w, w, n ]
        ]),
        E: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, w ],
            [ w, n, n, n, w ]
        ]),
        F: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ],
            [ w, n, n, n, n ]
        ]),
        G: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ w, n, n, w, w ]
        ]),
        H: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ w, w, w, w, w ]
        ]),
        I: new Sprite([
            [ w, n, n, n, w ],
            [ w, w, w, w, w ],
            [ w, n, n, n, w ]
        ]),
        J: new Sprite([
            [ n, n, n, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, n ]
        ]),
        K: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ w, w, n, w, w ]
        ]),
        L: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, n, n, w ],
            [ n, n, n, n, w ]
        ]),
        M: new Sprite([
            [ w, w, w, w, w ],
            [ n, w, n, n, n ],
            [ n, n, w, n, n ],
            [ n, w, n, n, n ],
            [ w, w, w, w, w ]
        ]),
        N: new Sprite([
            [ w, w, w, w, w ],
            [ n, w, n, n, n ],
            [ n, n, w, n, n ],
            [ w, w, w, w, w ]
        ]),
        O: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ n, w, w, w, n ]
        ]),
        P: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ],
            [ n, w, n, n, n ]
        ]),
        Q: new Sprite([
            [ n, w, w, w, n ],
            [ w, n, n, n, w ],
            [ w, n, n, w, w ],
            [ n, w, w, w, w ]
        ]),
        R: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ],
            [ n, w, n, w, w ]
        ]),
        S: new Sprite([
            [ n, w, n, n, w ],
            [ w, n, w, n, w ],
            [ w, n, n, w, n ]
        ]),
        T: new Sprite([
            [ w, n, n, n, n ],
            [ w, w, w, w, w ],
            [ w, n, n, n, n ]
        ]),
        U: new Sprite([
            [ w, w, w, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, w ]
        ]),
        V: new Sprite([
            [ w, w, w, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, n ]
        ]),
        W: new Sprite([
            [ w, w, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, n, w, n ],
            [ n, n, n, n, w ],
            [ w, w, w, w, n ]
        ]),
        X: new Sprite([
            [ w, w, n, w, w ],
            [ n, n, w, n, n ],
            [ w, w, n, w, w ]
        ]),
        Y: new Sprite([
            [ w, w, n, n, n ],
            [ n, n, w, n, w ],
            [ w, w, w, w, n ]
        ]),
        Z: new Sprite([
            [ w, n, n, w, w ],
            [ w, n, w, n, w ],
            [ w, w, n, n, w ]
        ]),
        a: new Sprite([
            [ n, n, n, n, w, n ],
            [ n, w, n, w, n, w ],
            [ n, w, w, w, w, w ]
        ]),
        b: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, w ],
            [ n, n, n, w, w ]
        ]),
        c: new Sprite([
            [ n, w, w, w, w ],
            [ n, w, n, n, w ]
        ]),
        d: new Sprite([
            [ n, n, n, w, w ],
            [ n, n, w, n, w ],
            [ w, w, w, w, w ]
        ]),
        e: new Sprite([
            [ n, w, w, w, w, n ],
            [ n, w, n, w, n, w ],
            [ n, n, w, w, n, n ]
        ]),
        f: new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, n ]
        ]),
        g: new Sprite([
            [ n, n, w, w, n, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        h: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ n, n, n, w, w ]
        ]),
        i: new Sprite([
            [ w, n, w, w, w ]
        ]),
        j: new Sprite([
            [ n, n, n, n, n, w ],
            [ n, w, n, w, w, w ]
        ]),
        k: new Sprite([
            [ w, w, w, w, w ],
            [ n, n, w, n, n ],
            [ n, w, n, w, w ]
        ]),
        l: new Sprite([
            [ w, w, w, w, w ]
        ]),
        m: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, n ],
            [ n, n, n, w, n ],
            [ n, n, w, n, n ],
            [ n, n, w, w, w ]
        ]),
        n: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, n ],
            [ n, n, n, w, w ]
        ]),
        o: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, w ],
            [ n, n, w, w, w ]
        ]),
        p: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, w, n, n ],
            [ n, n, w, w, n, n, n ]
        ]),
        q: new Sprite([
            [ n, n, w, w, n, n, n ],
            [ n, n, w, n, w, n, n ],
            [ n, n, w, w, w, w, w ]
        ]),
        r: new Sprite([
            [ n, n, w, w, w ],
            [ n, n, w, n, n ]
        ]),
        s: new Sprite([
            [ n, w, w, n, w ],
            [ n, w, n, w, w ]
        ]),
        t: new Sprite([
            [ n, w, n, n, n ],
            [ w, w, w, w, w ],
            [ n, w, n, n, n ]
        ]),
        u: new Sprite([
            [ n, n, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, w, w, w ]
        ]),
        v: new Sprite([
            [ n, n, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, w, w, n ]
        ]),
        w: new Sprite([
            [ n, n, w, w, n ],
            [ n, n, n, n, w ],
            [ n, n, n, w, w ],
            [ n, n, n, n, w ],
            [ n, n, w, w, n ]
        ]),
        x: new Sprite([
            [ n, n, w, n, w ],
            [ n, n, n, w, n ],
            [ n, n, w, n, w ]
        ]),
        y: new Sprite([
            [ n, n, w, w, w, n, w ],
            [ n, n, n, n, w, n, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        z: new Sprite([
            [ n, n, w, n, n ],
            [ n, n, w, w, w ],
            [ n, n, n, n, w ]
        ]),
        '0': new Sprite([
            [ w, w, w, w, w ],
            [ w, n, n, n, w ],
            [ w, w, w, w, w ]
        ]),
        '1': new Sprite([
            [ w, n, n, n, w ],
            [ w, w, w, w, w ],
            [ n, n, n, n, w ]
        ]),
        '2': new Sprite([
            [ w, n, w, w, w ],
            [ w, n, w, n, w ],
            [ n, w, w, n, w ]
        ]),
        '3': new Sprite([
            [ w, n, w, n, w ],
            [ w, n, w, n, w ],
            [ w, w, w, w, w ]
        ]),
        '4': new Sprite([
            [ w, w, n, n, n ],
            [ n, n, w, n, n ],
            [ w, w, w, w, w ]
        ]),
        '5': new Sprite([
            [ w, w, w, n, w ],
            [ w, n, w, n, w ],
            [ w, n, n, w, w ]
        ]),
        '6': new Sprite([
            [ w, w, w, w, w ],
            [ w, n, w, n, w ],
            [ w, n, n, w, w ]
        ]),
        '7': new Sprite([
            [ w, n, n, w, w ],
            [ w, n, w, n, n ],
            [ w, w, n, n, n ]
        ]),
        '8': new Sprite([
            [ w, w, n, w, w ],
            [ w, n, w, n, w ],
            [ w, w, n, w, w ]
        ]),
        '9': new Sprite([
            [ w, w, n, n, w ],
            [ w, n, w, n, w ],
            [ w, w, w, w, w ]
        ]),
        '!': new Sprite([
            [ w, w, w, n, w ]
        ]),
        '.': new Sprite([
            [ n, n, n, n, w ]
        ]),
        ',': new Sprite([
            [ n, n, n, n, w, w ]
        ]),
        '?': new Sprite([
            [ w, n, w, w, n, w ],
            [ n, w, n, n, n, n ]
        ]),
        '<': new Sprite([
            [ n, n, w, n, n],
            [ n, w, w, w, n],
            [ w, w, n, w, w],
            [ w, n, n, n, w]

        ]),
        '>': new Sprite([
            [ w, n, n, n, w],
            [ w, w, n, w, w],
            [ n, w, w, w, n],
            [ n, n, w, n, n]
        ]),
        '-': new Sprite([
            [ n, n, w, n, n ],
            [ n, n, w, n, n ],
            [ n, n, w, n, n ]
        ]),
        ':': new Sprite([
            [ n, n, n, n, n ],
            [ n, n, w, n, w ],
            [ n, n, n, n, n ]
        ]),
        '$': new Sprite([
            [ n, n, w, n ],
            [ w, w, w, w ],
            [ w, n, w, n ],
            [ w, w, w, w ],
            [ n, w, n, w ],
            [ w, w, w, w ],
            [ n, w, n, n ]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: -1}),
        '+': new Sprite([
            [ n, n, n ],
            [ n, w, n ],
            [ w, w, w ],
            [ n, w, n ],
            [ n, n, n ]
        ]).invertY().rotateRight(),
        '%': new Sprite([
            [ w, n, n, w ],
            [ n, n, w, w ],
            [ n, w, w, n ],
            [ w, w, n, n ],
            [ w, n, n, w ]
        ]).invertY().rotateRight(),
        ' ': new Sprite([
            [ n, n, n, n, n ],
            [ n, n, n, n, n ],
            [ n, n, n, n, n ]
        ])
    };
});

SM.DefineModule('pxlr/fonts/arcade', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;

    return {
        meta: {
            width: 7,
            height: 7,
            lineHeight: 11,
            letterSpacing: 1,
            credit: "http://www.urbanfonts.com/fonts/Arcade.htm"
        },
        A: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, w, w, w, w, w, w ],
            [ w, w, n, n, w, n, n ],
            [ w, n, n, n, w, n, n ],
            [ w, w, n, n, w, n, n ],
            [ n, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ]
        ]),
        B: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, w, w, n ]
        ]),
        C: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, n, n, n, w, w ],
            [ n, w, n, n, n, w, n ]
        ]),
        D: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, n ]
        ]),
        E: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        F: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        G: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, n, w, w, w, w ],
            [ n, w, n, w, w, w, n ]
        ]),
        H: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, w, n, n, n ],
            [ n, n, n, w, n, n, n ],
            [ n, n, n, w, n, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        I: new Sprite([
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        J: new Sprite([
            [ n, n, n, n, n, w, n ],
            [ n, n, n, n, n, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        K: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, w, w, n ],
            [ n, w, w, n, w, w, n ],
            [ w, w, n, n, n, w, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        L: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ]
        ]),
        M: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, w ],
            [ n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        N: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        O: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, n ]
        ]),
        P: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, n, n, n ],
            [ w, w, w, w, n, n, n ],
            [ n, w, w, n, n, n, n ]
        ]),
        Q: new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, w, n, w ],
            [ w, n, n, n, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, n, w ]
        ]),
        R: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, n ],
            [ w, n, n, w, w, n, n ],
            [ w, n, n, w, w, w, n ],
            [ w, w, w, w, n, w, w ],
            [ n, w, w, n, n, n, w ]
        ]),
        S: new Sprite([
            [ n, w, w, n, n, w, n ],
            [ w, w, w, w, n, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, n, w, w, w, w ],
            [ n, w, n, n, w, w, n ]
        ]),
        T: new Sprite([
            [ w, n, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        U: new Sprite([
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, n ]
        ]),
        V: new Sprite([
            [ w, w, w, w, w, n, n ],
            [ w, w, w, w, w, w, n ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w ],
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, n, n ]
        ]),
        W: new Sprite([
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, n ],
            [ n, n, n, n, n, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, n ]
        ]),
        X: new Sprite([
            [ w, n, n, n, n, w, w ],
            [ w, w, n, n, w, w, n ],
            [ n, w, w, w, w, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, w, w, w, w, n, n ],
            [ w, w, n, n, w, w, n ],
            [ w, n, n, n, n, w, w ]
        ]),
        Y: new Sprite([
            [ w, w, w, n, n, n, n ],
            [ w, w, w, w, n, n, n ],
            [ n, n, n, w, w, w, w ],
            [ n, n, n, w, w, w, w ],
            [ w, w, w, w, n, n, n ],
            [ w, w, w, n, n, n, n ],
            [ n, n, n, n, n, n, n ]
        ]),
        Z: new Sprite([
            [ w, n, n, n, n, w, w ],
            [ w, n, n, n, w, w, w ],
            [ w, n, n, w, w, n, w ],
            [ w, n, w, w, n, n, w ],
            [ w, w, w, n, n, n, w ],
            [ w, w, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ]
        ]),
        a: new Sprite([
            [ n, n, n, n, n, w, n ],
            [ n, n, w, n, w, w, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        b: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, n ]
        ]),
        c: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, n, w, w ],
            [ n, n, n, w, n, w, n ]
        ]),
        d: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        e: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, n, w ],
            [ n, n, n, w, w, n, n ]
        ]),
        f: new Sprite([
            [ n, n, w, n, n, n, n ],
            [ n, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ w, n, w, n, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        g: new Sprite([
            [ n, n, n, w, w, w, n, n, n ],
            [ n, n, w, w, w, w, w, n, w ],
            [ n, n, w, n, n, n, w, n, w ],
            [ n, n, w, n, n, n, w, n, w ],
            [ n, n, w, n, n, n, w, n, w ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, n, w, w, w, w, w, n ]
        ]),
        h: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        i: new Sprite([
            [ w, n, w, w, w, w, w ],
            [ w, n, w, w, w, w, w ]
        ]),
        j: new Sprite([
            [ n, n, n, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ w, n, w, w, w, w, w ],
            [ w, n, w, w, w, w, n ]
        ]),
        k: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, w, n, n ],
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, n, w, w ],
            [ n, n, w, n, n, n, w ]
        ]),
        l: new Sprite([
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ]
        ]),
        m: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, n, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        n: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, w ]
        ]),
        o: new Sprite([
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, n ]
        ]),
        p: new Sprite([
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, w, w, w, w, n, n ],
            [ n, n, n, w, w, w, n, n, n ]
        ]),
        q: new Sprite([
            [ n, n, n, w, w, w, n, n, n ],
            [ n, n, w, w, w, w, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, n, n, n, w, n, n ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w, w, w ]
        ]),
        r: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, w, n, n, n ],
            [ n, n, w, n, n, n, n ],
            [ n, n, w, n, n, n, n ]
        ]),
        s: new Sprite([
            [ n, n, n, w, n, n, n ],
            [ n, n, w, w, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, n, w, w, w ],
            [ n, n, n, n, n, w, n ]
        ]),
        t: new Sprite([
            [ n, n, w, n, n, n, n ],
            [ w, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ n, n, w, n, n, n, w ],
            [ n, n, n, n, n, n, w ]
        ]),
        u: new Sprite([
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        v: new Sprite([
            [ n, n, w, w, w, n, n ],
            [ n, n, w, w, w, w, n ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w ],
            [ n, n, w, w, w, w, n ],
            [ n, n, w, w, w, n, n ]
        ]),
        w: new Sprite([
            [ n, n, w, w, w, w, n ],
            [ n, n, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, n ],
            [ n, n, n, n, n, n, w ],
            [ n, n, w, w, w, w, w ],
            [ n, n, w, w, w, w, n ]
        ]),
        x: new Sprite([
            [ n, n, w, n, n, n, w ],
            [ n, n, w, w, n, w, w ],
            [ n, n, n, w, w, w, n ],
            [ n, n, n, n, w, n, n ],
            [ n, n, n, w, w, w, n ],
            [ n, n, w, w, n, w, w ],
            [ n, n, w, n, n, n, w ]
        ]),
        y: new Sprite([
            [ n, n, w, w, w, w, n, n, n ],
            [ n, n, w, w, w, w, w, n, w ],
            [ n, n, n, n, n, n, w, n, w ],
            [ n, n, n, n, n, n, w, n, w ],
            [ n, n, n, n, n, n, w, n, w ],
            [ n, n, w, w, w, w, w, w, w ],
            [ n, n, w, w, w, w, w, w, n ]
        ]),
        z: new Sprite([
            [ n, n, w, n, n, n, w ],
            [ n, n, w, n, n, w, w ],
            [ n, n, w, n, w, w, w ],
            [ n, n, w, n, w, n, w ],
            [ n, n, w, w, w, n, w ],
            [ n, n, w, w, n, n, w ],
            [ n, n, w, n, n, n, w ]
        ]),
        ' ': new Sprite([
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ]
        ]),
        '0': new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, w, w, w, n ]
        ]),
        '1': new Sprite([
            [ n, n, n, n, n, n, w ],
            [ n, w, n, n, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, n, n, w ]
        ]),
        '2': new Sprite([
            [ n, w, n, n, n, w, w ],
            [ w, w, n, n, w, w, w ],
            [ w, n, n, w, w, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, w, w, n, n, w ],
            [ w, w, w, n, n, n, w ],
            [ n, w, n, n, n, n, w ]
        ]),
        '3': new Sprite([
            [ n, w, n, n, n, w, n ],
            [ w, w, n, n, n, w, w ],
            [ w, n, n, n, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, w, w, n ]
        ]),
        '4': new Sprite([
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, w, n, n ],
            [ n, w, w, n, w, n, n ],
            [ w, w, n, n, w, n, n ],
            [ w, w, w, w, w, w, w ],
            [ w, w, w, w, w, w, w ],
            [ n, n, n, n, w, n, n ]
        ]),
        '5': new Sprite([
            [ w, w, w, n, n, w, n ],
            [ w, w, w, n, n, w, w ],
            [ w, n, w, n, n, n, w ],
            [ w, n, w, n, n, n, w ],
            [ w, n, w, n, n, n, w ],
            [ w, n, w, w, w, w, w ],
            [ n, n, n, w, w, w, n ]

        ]),
        '6': new Sprite([
            [ n, w, w, w, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, n, w, w, w, w ],
            [ n, w, n, n, w, w, n ]
        ]),
        '7': new Sprite([
            [ w, n, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ],
            [ w, n, n, w, w, w, w ],
            [ w, n, w, w, w, w, w ],
            [ w, w, w, n, n, n, n ],
            [ w, w, n, n, n, n, n ],
            [ w, n, n, n, n, n, n ]
        ]),
        '8': new Sprite([
            [ n, w, w, n, w, w, n ],
            [ w, w, w, w, w, w, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, w, w, w, w, w, w ],
            [ n, w, w, n, w, w, n ]
        ]),
        '9': new Sprite([
            [ n, w, w, n, n, n, n ],
            [ w, w, w, w, n, n, n ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, n, w ],
            [ w, n, n, w, n, w, w ],
            [ w, w, w, w, w, w, n ],
            [ n, w, w, w, w, n, n ]
        ]),
        '!': new Sprite([
            [ n, n, n, n, n, n, w ],
            [ n, n, n, n, w, n, w ],
            [ n, n, n, w, w, n, n ],
            [ n, n, w, w, n, n, n ],
            [ n, w, w, w, n, n, n ],
            [ w, w, w, n, n, n, n ],
            [ w, w, w, n, n, n, n ]
        ]),
        '.': new Sprite([
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, w, w ],
            [ n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n ]
        ]),
        ',': new Sprite([
            [ n, n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w, w ],
            [ n, n, n, n, n, w, w, n ]
        ]),
        '?': new Sprite([
            [ n, w, n, n, n, n, n ],
            [ w, w, n, n, n, n, n ],
            [ w, n, n, w, n, w, w ],
            [ w, n, w, w, n, w, w ],
            [ w, w, w, n, n, n, n ],
            [ n, w, n, n, n, n, n ]
        ]),
        '$': new Sprite([
            [ n, n, w, n, n ],
            [ n, w, w, w, n ],
            [ w, n, w, n, w ],
            [ n, w, w, n, n ],
            [ n, n, w, n, n ],
            [ n, n, w, w, n ],
            [ w, n, w, n, w ],
            [ n, w, w, w, n ],
            [ n, n, w, n, n ]
        ]).invertY().rotateRight(),
        '-': new Sprite([
            [ n, n, n, n ],
            [ n, n, n, n ],
            [ n, n, n, n ],
            [ w, w, w, w ]
        ]).invertY().rotateRight()
    };
});

SM.DefineModule('pxlr/fonts/elian', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;
    var lowerCaseOffset = { x: 0, y: 2 };

    var font = {
        meta: {
            width: 3,
            height: 3,
            lineHeight: 7,
            letterSpacing: 1
        },
        A: new Sprite([
            [w, w],
            [n, w],
            [n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        B: new Sprite([
            [w, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        C: new Sprite([
            [n, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),

        D: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        E: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        F: new Sprite([
            [w, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),

        G: new Sprite([
            [w, w],
            [w, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        H: new Sprite([
            [w, w],
            [w, n],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        I: new Sprite([
            [w, n],
            [w, n],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),


        J: new Sprite([
            [w, w],
            [n, w],
            [n, w],
            [n, w],
            [n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        K: new Sprite([
            [w, w],
            [n, w],
            [n, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        L: new Sprite([
            [n, w],
            [n, w],
            [n, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight(),

        M: new Sprite([
            [w, w, w],
            [w, n, w],
            [n, n, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        N: new Sprite([
            [w, w, w],
            [w, n, w],
            [w, w, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        O: new Sprite([
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight(),

        P: new Sprite([
            [w, w],
            [w, n],
            [w, n],
            [w, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        Q: new Sprite([
            [w, w],
            [w, n],
            [w, n],
            [w, n],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        R: new Sprite([
            [w, n],
            [w, n],
            [w, n],
            [w, n],
            [w, w]
        ]).invertY().rotateRight(),


        S: new Sprite([
            [n, w],
            [n, n],
            [w, w],
            [n, w],
            [n, w],
            [n, w],
            [n, w]
        ]).invertY().rotateRight(),
        T: new Sprite([
            [n, w, w],
            [n, n, w],
            [w, n, w],
            [n, n, w],
            [n, w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        U: new Sprite([
            [n, w],
            [n, n],
            [n, w],
            [n, w],
            [n, w],
            [n, w],
            [w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: -2}),

        V: new Sprite([
            [n, w, n],
            [n, n, n],
            [w, w, w],
            [w, n, w],
            [n, n, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        W: new Sprite([
            [n, w, n],
            [n, n, n],
            [w, w, w],
            [w, n, w],
            [w, w, w],
            [n, n, w],
            [n, n, w]
        ]).invertY().rotateRight(),
        X: new Sprite([
            [n, n, w],
            [n, n, n],
            [n, n, w],
            [n, n, w],
            [n, n, w],
            [w, n, w],
            [w, w, w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: -2}),

        Y: new Sprite([
            [w, n],
            [n, n],
            [w, w],
            [w, n],
            [w, n],
            [w, n],
            [w, n]
        ]).invertY().rotateRight(),
        Z: new Sprite([
            [w, w, n],
            [w, n, n],
            [w, n, w],
            [w, n, n],
            [w, w, n]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        ' ': new Sprite([
            [n, n],
            [n, n],
            [n, n]
        ]),
        '.': new Sprite([
            [n, n],
            [n, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        ',': new Sprite([
            [n, n],
            [n, n],
            [w, n],
            [w, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset),
        "'": new Sprite([
            [w],
            [w]
        ]).invertY().rotateRight().setPermanentOffset({x: 0, y: 1}),
        '-': new Sprite([
            [n, n],
            [w, w],
            [n, n]
        ]).invertY().rotateRight().setPermanentOffset(lowerCaseOffset)
    };

    var toLower = function (index) { return 'abcdefghijklmnopqrstuvwxyz'[ index ]; };
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (capital, index) {
        font[ toLower(index) ] = font[ capital ];
    });

    return font;
});

SM.DefineModule('pxlr/fonts/phoenix', function (require) {
    var Sprite = require('models/sprite');

    var w = "white";
    var n = null;

    return {
        meta: {
            width: 15,
            height: 15,
            lineHeight: 16,
            letterSpacing: -1
        },
        P: new Sprite([
            [ n, n, n, w, w, w, w, w, w, w, w, w, n, n ],
            [ n, n, n, n, n, w, w, w, n, n, w, w, w, n ],
            [ n, n, n, n, n, w, w, n, n, n, n, w, w, w ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, n, n, w, w, w, n, n, n, n, w, w, w ],
            [ n, n, n, w, w, w, w, w, n, n, w, w, w, n ],
            [ n, n, n, w, w, n, w, w, w, w, w, w, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, n, n, n, n, n, n ]
        ]).invertY().rotateRight(),
        H: new Sprite([
            [ n, n, n, w, w, w, w, w, w, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, w, w, w, w, w, w, w, w, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, w, w, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight(),
        O: new Sprite([
            [ n, n, n, n, n, w, w, w, w, w, n, n ],
            [ n, n, n, n, w, w, w, n, w, w, w, n ],
            [ n, n, n, w, w, w, n, n, n, w, w, n ],
            [ n, n, n, w, w, n, n, n, n, w, w, w ],
            [ n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, n, w, w, n, n, n, n, n, n, w, w ],
            [ n, w, w, n, n, n, n, n, n, n, w, w ],
            [ n, w, w, n, n, n, n, n, n, n, w, w ],
            [ n, w, w, n, n, n, n, n, n, w, w, n ],
            [ w, w, n, n, n, n, n, n, n, w, w, n ],
            [ w, w, n, n, n, n, n, n, n, w, w, n ],
            [ w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, w, w, n, n, n, n, w, w, n, n, n ],
            [ n, n, w, w, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, w, w, n, n, n, n, n ]
        ]).invertY().rotateRight(),
        E: new Sprite([
            [ n, n, n, w, w, w, w, w, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, n, w, n, n, n ],
            [ n, n, n, w, w, w, w, w, w, w, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, n, w, n, n ],
            [ w, w, w, w, w, w, w, w, w, w, w, w, n, n ]
        ]).invertY().rotateRight(),
        N: new Sprite([
            [ n, n, n, w, w, w, w, n, n, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, w, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, w, w, w, w, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, w, w, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, w, w, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, w, w, n, n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, w, w, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, w, w, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, w, w, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, w, w, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, w, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, n, n, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight(),
        I: new Sprite([
            [ n, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, w, w, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight(),
        X: new Sprite([
            [ n, n, n, w, w, w, w, w, w, n, n, w, w, w, w, w, w ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, n, w, w, n, n ],
            [ n, n, n, n, n, w, w, n, n, n, n, n, w, w, n, n, n ],
            [ n, n, n, n, n, n, w, w, n, n, n, w, w, n, n, n, n ],
            [ n, n, n, n, n, n, w, w, n, n, w, w, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, w, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, n, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, n, w, w, w, w, n, n, n, n, n, n, n ],
            [ n, n, n, n, n, w, w, n, n, w, w, n, n, n, n, n, n ],
            [ n, n, n, n, w, w, n, n, n, w, w, n, n, n, n, n, n ],
            [ n, n, n, w, w, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ n, n, w, w, n, n, n, n, n, n, w, w, n, n, n, n, n ],
            [ w, w, w, w, w, w, n, n, w, w, w, w, w, w, n, n, n ]
        ]).invertY().rotateRight()
    };
});

SM.DefineModule('main', function (require) {
    var CanvasRenderer = require('pxlr/gl/canvas');

    var fonts = {
        'arcade': {
            sprites: require('pxlr/fonts/arcade'),
            lines: [
                '-- Pixel Arcade Font --',
                '',
                'abcdefghijklmn',
                'opqrstuvwxyz',
                '',
                'ABCDEFGHIJKLM',
                'NOPQRSTUVWXYZ',
                '',
                '1234567890?.,!-',
                '',
                'Sample Sentence!',
                'YEAH FONTS!!!?'
            ]
        },
        'arcade-small': {
            sprites: require('pxlr/fonts/arcade-small'),
            lines: [
                '-- Arcade Small Font --',
                '',
                'abcdefghijklmnopqrstuvwxyz',
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                '1234567890<>?.,!-+',
                '',
                'Minimal fonts are fun!',
                'Yay, blocky little letters.'
            ]
        },
        'phoenix': {
            sprites: require('pxlr/fonts/phoenix'),
            lines: [
                'PHOENIX'
            ]
        },
        'elian': {
            sprites: require('pxlr/fonts/elian'),
            lines: [
                '-- Elian Script --',
                'abcdefghijklmnopqrstuvwxyz',
                '',
                "It's fun to confuse your friends with elian.",
                "They won't know what you said,",
                'so they might call you weird.'
            ]
        }
    };

    function changeFont(fontName) {
        var font = fonts[ fontName ];

        return function () {
            renderFont(font);
        };
    }

    document.getElementById('arcade').addEventListener('click', changeFont('arcade'));
    document.getElementById('arcade-small').addEventListener('click', changeFont('arcade-small'));
    document.getElementById('phoenix').addEventListener('click', changeFont('phoenix'));
    document.getElementById('elian').addEventListener('click', changeFont('elian'));

    var renderer = new CanvasRenderer({ width: 200, height: 150 });
    renderer.setFillColor("#FFFFFF");

    function renderFont(font) {
        var frame = renderer.newRenderFrame();
        frame.clear();

        var lineHeight = font.sprites.meta.lineHeight;
        var lineOffset = 5;
        var horizontalOffset = 5;
        font.lines.forEach(function (line) {
            line.split('').forEach(function (letter) {
                var letterSprite = font.sprites[ letter ];
                if (letterSprite) {
                    letterSprite.applyColor("#000");
                    letterSprite.renderToFrame(frame, horizontalOffset, lineOffset);
                    horizontalOffset += letterSprite.width + 1;
                }
            });
            horizontalOffset = 5;
            lineOffset += lineHeight;
        });

        renderer.renderFrame();
    }

    changeFont('arcade')();
});

SM.DefineModule('pxlr/fonts', function () {
    return {
        name: "pxlr-fonts",
        information: "Collection of pixel fonts meant for use with the pxlr engine"
    };
});

/* provide namespace backwards compatibility for v1 */
SM.DefineModule('fonts/arcade', function (require) {
    return require('pxlr/fonts/arcade');
});
SM.DefineModule('fonts/arcade-small', function (require) {
    return require('pxlr/fonts/arcade-small');
});
SM.DefineModule('fonts/phoenix', function (require) {
    return require('pxlr/fonts/phoenix');
});
