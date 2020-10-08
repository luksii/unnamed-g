#ifndef MODEL_H
#define MODEL_H

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>
#include <map>
#include <vector>

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <stb/stb_image.h>
#include <assimp/Importer.hpp>
#include <assimp/scene.h>
#include <assimp/postprocess.h>

#include "Shader.h"
#include "Mesh.h"

class Model
{
public:
    Model(const std::string& path, bool gamma = false);

    void Draw(Shader& shader);

private:
    std::vector<Mesh> meshes;
    std::vector<Mesh::Texture> texturesLoaded;
    std::string directory;
    bool gammaCorrection;


    void loadModel(const std::string& path);
    void processNode(aiNode* node, const aiScene* scene);
    Mesh processMesh(aiMesh* mesh, const aiScene* scene);
    std::vector<Mesh::Texture> loadMaterialTextures(aiMaterial* material,
        aiTextureType aiType, TEXTYPEenum txType);
};
#endif // !MODEL_H