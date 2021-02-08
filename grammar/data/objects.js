
const objects = {
	'empty' : {
		'object' : '',
		'type' : '',
		'functions' : {
			'name' : `obj${String(Date.now())}`,
			'group' : []
		}
	},
	'synth' : {
		'object' : '',
		'type' : 'saw',
		'functions' : {
			'name' : `obj${String(Date.now())}`,
			'group' : [],
			'time' : [ '1', 0 ],
			'note' : [ 0, 0 ],
			'env' : [ 5, 500 ],
			'beat' : 1,
			'amp' : 0.7,
			'wave2' : [ 'saw', 0 ],
			'add_fx' : [],
		}
	},
	'sample' : {
		'object' : '',
		'type' : 'kick_909',
		'functions' : {
			'name' : `obj${String(Date.now())}`,
			'group' : [],
			'time' : [ '1', 0 ],
			// 'note' : [ 0, 0 ],
			'speed' : 1,
			'env' : [ -1 ],
			'beat' : 1,
			'amp' : 0.9,
			'stretch': [0, 1, 1],
			'add_fx' : [],
		}
	}
}
exports.objects = objects;