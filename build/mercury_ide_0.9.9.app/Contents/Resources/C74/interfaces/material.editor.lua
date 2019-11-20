this.outlets = 4

local max = require("max")
local format = string.format

local edited_material_name = nil
-- target jit.gl.material being edited
local target_materials = {}
listener = nil

local onames = {
	getattr = 0,
	imageui = 1,
	thumbnails = 2,
	thispatcher = 3,
}

-- Global dirty flag
-- Set when target_materials are considered 
-- dirty relative to the editor material
dirty = false

local dirty_attrs = {
	-- model
	diffuse_model = true,
	specular_model = true,
	
	-- model parameters
	shininess = true,
	diffuse_size = true,
	diffuse_smooth = true,
	specular_size = true,
	specular_smooth = true,
	roughness = true,
	darkness = true,
	
	-- colors
	mat_emission = true,
	mat_ambient = true,
	mat_diffuse = true,
	mat_specular = true,
	
	-- fog
	fog = true,
	fog_color = true,
	fog_density = true,
	fog_range = true,
}

local get_edited_material

local
function refresh_patcher()
	-- connect to message ";max refresh"
	outlet(onames.getattr, "bang")
end

local
function set_dirty(v)
	if(v and v ~= dirty) then
		-- set override on first dirty
		for i, target_material in ipairs(target_materials) do
			target_material.override = 1
		end
	end

	dirty = v
	outlet(onames.thumbnails, "set_dirty", dirty and 1 or 0)
end

local cloning = false
local
function mtl_cb(e)
	if(e.eventname == "attr_modified") then
		-- modified current material
		local attrname = e.args[1]
		if(dirty_attrs[attrname]) then
			if(not cloning) then
				set_dirty(true)
				local edited_material = get_edited_material()
				local v = edited_material[attrname]
				--[[
				if(type(v) == "table") then
					print("attrname", attrname, table.concat(v, " "))
				else
					print("attrname", attrname, v)
				end
				--]]
				for i, target_material in ipairs(target_materials) do
				--	print(i, target_material)
					target_material[attrname] = v
				end
			end
		end
	elseif(e.eventname == "import_material") then
		-- just imported a new material
		set_dirty(true)
		refresh_patcher()
		local edited_material = get_edited_material()
		--print("import_material", edited_material.matfile)
		for i, target_material in ipairs(target_materials) do
			target_material.matfile = edited_material.matfile
		end
		outlet(onames.imageui, "import_material")
		
	elseif(e.eventname:match("%a+_texture")) then
		-- texture set/cleared event
		set_dirty(true)
	elseif(e.eventname == "rebuild") then
		outlet(onames.imageui, "rebuild")
	else
		-- print("EVENT:", e.eventname)
	end
end

function get_edited_material()
	-- look up Material's Browser material by name
	if(not edited_material_name) then
		edited_material_name = this.material
		listener = jit.listener(edited_material_name, mtl_cb)
	end

	return assert(
		jit.findregistered(edited_material_name), 
		"couldn't get edited material"
	)
end

local
function lose_focus()
	-- apply edits to target/focus jit.gl.material object
	if(dirty) then
		local edited_material = get_edited_material()
		for i, target_material in ipairs(target_materials) do
			target_material:clone(edited_material)
			target_material.override = 1
		end
	end
	refresh_patcher()
	--[[
	for i, target_material in ipairs(target_materials) do
		print("lose focus")
	end
	--]]
end

local
function gain_focus()
	if(target_materials[1]) then
		local target_material = target_materials[1]
		local edited_material = get_edited_material()
		cloning = true
		edited_material:clone(target_material)
		cloning = false
		set_dirty(false)
		outlet(onames.imageui, "import_material")
	end
	
	local title = "Materials Browser"
	if(#target_materials == 1) then
		title = "jit.gl.material Editor"
	elseif(#target_materials > 1) then
		title = format("jit.gl.material (%d) Editor", #target_materials)
	end
	outlet(onames.thispatcher, "title", title)
	
	--[[
	print("gain focus", #target_materials)
	for i, target_material in ipairs(target_materials) do
		print("gain focus:", i, target_material.name)
	end
	--]]
end

function closebang()
	lose_focus()
	dirty = false
end

-- Called on the target_material 
-- to prepare editing
function set_target_material(...)
	local mtls = {...}
	lose_focus()
	target_materials = mtls
	gain_focus()
end


local matrix = jit.matrix()
function get_texture_data(name)
	local x = get_edited_material()
	local res = x:copy_texture(name, matrix)
	if(res) then
		outlet(onames.imageui, "jit_matrix", matrix.name)
	else
		outlet(onames.imageui, "jit_matrix")
	end
end

function init()
	get_edited_material()
end	