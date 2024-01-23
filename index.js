function pend(callback) {

	// the main return proxy
	let stuff = new Proxy(


		// the promise returned originally
		Promise.resolve( {} ), {


		// detector for when something is called from the promise
		get(target, prop) {

			// if it's being awaited then run the promise
			if (prop == "then" || prop == "finally") {
				let f = callback();
				f = ((f instanceof Promise) ? f : Promise.resolve(f))
				return f.then.bind(f);
			}
			
			return target[prop].bind(target);
		}
	});


	// inspect stuff
	try {
		
		stuff[require('util').inspect.custom] = function() {
			return `\x1b[3mPender \x1b[33m<pending>\x1b[0m`;
		}

	} catch(e) { }


	return stuff;
}


module.exports = pend;
