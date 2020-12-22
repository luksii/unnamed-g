#version 420 core

struct DirectionalLight
{
	/*
	* Directional light imitates the sun. The sun is so 
	* far away that it is omnipresent from a specific
	* direction. 
	*/
	vec3 direction;

	/*
	* The three light components of the Phong lighting model
	*/
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

layout (std140, binding = 1) uniform Camera
{
	vec3 cameraPos;
};

layout (std140, binding = 2) uniform WorldLight
{
	vec3 direction_1;
	vec3 direction_2;
};

uniform vec4 color_diffuse_1;
//uniform vec4 color_specular_1;
uniform vec4 color_ambient_1;

in VS_OUT
{
	vec3 fragPos;
    vec3 fragNormal;
} fs_in;

vec3 CalculateDirectionalPhong(DirectionalLight light, vec3 fragPos, vec3 fragNormal, vec3 cameraPos);
vec3 CalculateDirectionalBlinnPhong();

DirectionalLight light_1;
DirectionalLight light_2;
const float SHININESS = 8.0;

void main()
{
	light_1.direction = direction_1;
	light_1.ambient = vec3(0.1, 0.1, 0.1);
	light_1.diffuse = vec3(1.0, 1.0, 1.0);
	light_1.specular = vec3(0.0, 0.0, 0.0);

	light_2.direction = direction_2;
	light_2.ambient = vec3(0.0, 0.0, 0.0);
	light_2.diffuse = vec3(0.4, 0.4, 0.4);
	light_2.specular = vec3(0.0, 0.0, 0.0);

	vec3 fragColor = CalculateDirectionalPhong(light_1, fs_in.fragPos, fs_in.fragNormal, cameraPos);
	fragColor += CalculateDirectionalPhong(light_2, fs_in.fragPos, fs_in.fragNormal, cameraPos);
    gl_FragColor = vec4(fragColor, 1.0);
}

vec3 CalculateDirectionalPhong(DirectionalLight light, vec3 fragPos, vec3 fragNormal, vec3 cameraPos)
{
	vec3 kA = light.ambient;
	vec3 kD = light.diffuse;
	vec3 kS = light.specular;
	
	vec3 N = normalize(fragNormal);
	vec3 L = normalize(-light.direction);
	vec3 R = reflect(N, light.direction);
	vec3 V = cameraPos;

	vec3 ambientC = kA * vec3(color_ambient_1);
	vec3 diffuseC = kD * max(dot(L, N), 0.0) * vec3(color_diffuse_1);
//	vec3 specularC = kS * pow(max(dot(R, V), 0.0), 1) * vec3(color_specular_1);

	return ambientC + diffuseC;
}