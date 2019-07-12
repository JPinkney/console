// contains all the relevant information for transforming openapi specifications (such as kuberneres openapi)
// to json schemas

type GroupVersionKind = {
    "kind": string,
    "version": string,
    "group": string
};
  
export function OpenAPItoJSONSchema(openAPI: any) {

    const convertedOpenAPI = convertGroupVersionKindToJSONSchema(openAPI);
    
    return {
        "definitions": {
            convertedOpenAPI
        }
    };
}

/**
 * Converts the openAPI kubernetes specification for group, version, kind to JSON Schema
 * 
 * Context: The openAPI specification gives the group, version, and kind objects as 'x-kubernetes-group-version-kind'
 * instead of adding the values to the enum's
 */
function convertGroupVersionKindToJSONSchema(openAPI: any) {
    for (const definition in openAPI) {
        if (openAPI.hasOwnProperty(definition)) {
            const groupVersionKind = openAPI['x-kubernetes-group-version-kind'];

            // If this object has x-kubernetes-group-version-kind then add their values into correct places in JSON Schema
            if (groupVersionKind) {
                const gvkEnums = groupVersionKindToEnums(groupVersionKind);
                createOrAppendAPIVersion(definition, gvkEnums.versionEnum);
                createOrAppendKind(definition, gvkEnums.kindEnum);
            }
        }
    }
}

/**
 * Given an array of GroupVersionKind objects, return their JSON Schema representation as enums
 */
function groupVersionKindToEnums(gvkObjArray: [GroupVersionKind]) {
    const versionEnum = [];
    const kindEnum = []; 
    for (const gvkObj of gvkObjArray) {
        if (gvkObj.group && gvkObj.version) {
            versionEnum.push(gvkObj.group + "/" + gvkObj.version);
        }
        if (gvkObj.kind) {
            kindEnum.push(gvkObj.kind);
        }
    }
    return {
        versionEnum,
        kindEnum
    }
}

/**
 * Append enums to APIVersion or create the object if it doesn't exist
 */
function createOrAppendAPIVersion(openAPI: any, apiVersionEnum: string[]) {
    if (openAPI['apiVersion']) {
        openAPI['apiVersion'].enum.push(...apiVersionEnum);
    } else {
        openAPI['apiVersion'] = {
            enum: apiVersionEnum
        }
    }
}

/**
 * Append enums to kind or create the object if it doesn't exist
 */
function createOrAppendKind(openAPI: any, kindEnum: string[]) {
    if (openAPI['kind']) {
        openAPI['kind'].enum.push(...kindEnum);
    } else {
        openAPI['kind'] = {
            enum: kindEnum
        }
    }
}