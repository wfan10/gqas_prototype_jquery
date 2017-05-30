/**
 * Polyfills for generic javascript ... 
 * Authored by William Fan 2016
 */

//Polyfill for Object.create( prototype [, properties] )
if (typeof Object.create !== 'function') {
  Object.create = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

/**
 * Return the name of a function or 
 * if anonymous function: variable assigned an anonymous function 
 * or if method name if function is assigned to object. 
 * Example: 
 * var f = function() {};
 * var object = {
 * someMethod: function() {}
 * };
 * console.log(f.name); // "f"
 * console.log(object.someMethod.name); // "someMethod"
 * 
 
Function.prototype.getName = function() {
  if ("name" in this) return this.name;
  return undefined;
};

*/
/**
 * Implement window, document, utility functions
 */
(function(win, doc) {
  /*
   * Object.prototype.toString returns [object String]. classOf(o) returns String. 
   */
  function classOf(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  }
  //
  //win.classOf = classOf;

  /*
   * Use instead of typeof. 
   * Usage: 
   * var anArray = ['a','b','c'];
   * var type = type( anArray );
   */
  function type(o) {
    var t, c, n; // type, class, name

    // Special case for the null value:
    if (o === null) return "null";

    // Another special case: NaN is the only value not equal to itself:
    if (o !== o) return "nan";

    // Use typeof for any value other than "object".
    // This identifies any primitive value and also functions.
    if ((t = typeof o) !== "object") return t;

    // Return the class of the object unless it is "Object".
    // This will identify most native objects.
    if ((c = classOf(o)) !== "Object") return c;

    // Return the object's constructor name, if it has one
    if (o.constructor && typeof o.constructor === "function" &&
      (n = o.constructor.getName())) return n;

    // We can't determine a more specific type, so return "Object"
    return "Object";
  }

  win.type = type;

  /**
   * Self incremental counter object. 
   * Usage: var counter = counter();
   * var count = counter.count()
   */
  function counter() {
    var n = 0;
    return {
      count: function() {
        return n++;
      },
      reset: function() {
        n = 0;
      },
      value: function() {
        return n;
      }
    };
  }
  //
  win.counter = counter;

  /**
   * returns Array: of object hasOwnProperty properties
   * arguments: ref obj object to instrospect
   * Usage: var props = objProps( ['a','b','c']);
   */
  win.objProps = function(obj) {
    var content = [];
    if (obj instanceof Object) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          var $this = Object.create({});
          $this[prop] = obj[prop];
          content.push($this);
        }
      }
    }
    return content;
  };

  /**
   * Check to see if storage is available
   *  type is either 'localStorage' or 'sessionStorage'
   *  Should be standard in all browsers
   **/
  win.storageAvailable = function(type) {
    try {
      if (!type) throw new Error('storageAvailable requires type argument.');
      var storage = win[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x, x);
      return true;
    } catch (e) {
      console.error('storageAvailable', e.message);
      return false;
    }
  };

})(window, document);