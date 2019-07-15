export function resolveCustomResourceDefinition(yamlContent) {

    // Todo add guards
    const crdGroup = yamlContent.spec.group;
    const crdVersion = yamlContent.spec.version;
    const newApiVersion = `${crdGroup}/${crdVersion}`;
    const newKind = yamlContent.spec.names.kind;

    const properties = {
      "properties": {
        "apiVersion": {
          "description": "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources",
          "type": [
            "string"
          ],
          "enum": [
            newApiVersion
          ]
        },
        "kind": {
          "description": "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds",
          "type": [
            "string"
          ],
          "enum": [
            newKind
          ]
        }
      }
    }

    return properties;
  }
