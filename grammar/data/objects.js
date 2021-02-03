
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
			'note' : [ 0, 0 ],
			'time' : [ '1', 0 ],
			'env' : [ 5, 500 ],
			'beat' : 1,
			'amp' : 0.7,
			'wave2' : [ 'saw', 0 ],
			'add_fx' : [],
		}
	}
}
exports.objects = objects;