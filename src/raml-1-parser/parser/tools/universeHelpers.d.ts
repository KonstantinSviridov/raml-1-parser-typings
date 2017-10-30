import hl = require("../../parser/highLevelAST");
export declare function isDocumentationProperty(p: hl.IProperty): boolean;
export declare function isUsagePropertyName(name: string): boolean;
export declare function isUsageProperty(p: hl.IProperty): boolean;
export declare function isMasterRefProperty(p: hl.IProperty): boolean;
export declare function isDescriptionPropertyName(name: string): boolean;
export declare function isDescriptionProperty(p: hl.IProperty): boolean;
export declare function isRequiredPropertyName(name: string): boolean;
export declare function isDisplayNamePropertyName(name: string): boolean;
export declare function isDisplayNameProperty(p: hl.IProperty): boolean;
export declare function isRequiredProperty(p: hl.IProperty): boolean;
export declare function isTitlePropertyName(name: string): boolean;
export declare function isTitleProperty(p: hl.IProperty): boolean;
export declare function isHeadersProperty(p: hl.IProperty): boolean;
export declare function isHeadersPropertyName(name: string): boolean;
export declare function isFormParametersProperty(p: hl.IProperty): boolean;
export declare function isFormParametersPropertyName(name: string): boolean;
export declare function isQueryParametersProperty(p: hl.IProperty): boolean;
export declare function isQueryParametersPropertyName(name: string): boolean;
export declare function isAnnotationsProperty(p: hl.IProperty): boolean;
export declare function isAnnotationProperty(p: hl.IProperty): boolean;
export declare function isIsProperty(p: hl.IProperty): boolean;
export declare function isSecuredByProperty(p: hl.IProperty): boolean;
export declare function isSecuritySchemesProperty(p: hl.IProperty): boolean;
export declare function isSecuritySchemeProperty(p: hl.IProperty): boolean;
export declare function isTypeOrSchemaProperty(p: hl.IProperty): boolean;
export declare function isTypeProperty(p: hl.IProperty): boolean;
export declare function isItemsProperty(p: hl.IProperty): boolean;
export declare function isStructuredItemsProperty(p: hl.IProperty): boolean;
export declare function isPropertiesProperty(p: hl.IProperty): boolean;
export declare function isResponsesProperty(p: hl.IProperty): boolean;
export declare function isProtocolsProperty(p: hl.IProperty): boolean;
export declare function isNameProperty(p: hl.IProperty): boolean;
export declare function isBodyProperty(p: hl.IProperty): boolean;
export declare function isDefaultValue(p: hl.IProperty): boolean;
export declare function isSchemaProperty(p: hl.IProperty): boolean;
export declare function isTraitsProperty(p: hl.IProperty): boolean;
export declare function isTraitProperty(p: hl.IProperty): boolean;
export declare function isResourceTypesProperty(p: hl.IProperty): boolean;
export declare function isResourceTypeProperty(p: hl.IProperty): boolean;
export declare function isFacetsProperty(p: hl.IProperty): boolean;
export declare function isSchemasProperty(p: hl.IProperty): boolean;
export declare function isResourcesProperty(p: hl.IProperty): boolean;
export declare function isMethodsProperty(p: hl.IProperty): boolean;
export declare function isTypesProperty(p: hl.IProperty): boolean;
export declare function isExampleProperty(p: hl.IProperty): boolean;
export declare function isEnumProperty(p: hl.IProperty): boolean;
export declare function isExamplesProperty(p: hl.IProperty): boolean;
export declare function isValueProperty(p: hl.IProperty): boolean;
export declare function isUriParametersProperty(p: hl.IProperty): boolean;
export declare function isBaseUriParametersProperty(p: hl.IProperty): boolean;
export declare function isRAMLVersionProperty(p: hl.IProperty): boolean;
export declare function isUsesProperty(p: hl.IProperty): boolean;
export declare function isAnnotationTypesProperty(p: hl.IProperty): boolean;
export declare function isMethodType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isApiType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isBooleanTypeType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isMarkdownStringType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isResourceType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isTraitType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isTraitRefType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isResourceTypeRefType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isGlobalSchemaType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isSecuritySchemaType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isSecuritySchemaTypeDescendant(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isSecuritySchemeRefType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isTypeDeclarationType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isResponseType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isBodyLikeType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isOverlayType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isAnnotationTypeType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isResourceTypeType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isSchemaStringType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isMethodBaseType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isLibraryType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isStringTypeType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isAnyTypeType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isExampleSpecType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isExtensionType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isTypeDeclarationTypeOrDescendant(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isDocumentationType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isAnnotationRefTypeOrDescendant(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isApiSibling(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isLibraryBaseSibling(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isResourceBaseSibling(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isObjectTypeDeclarationSibling(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isArrayTypeDeclarationSibling(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isTypeDeclarationDescendant(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isParameterDescendant(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isStringTypeDeclarationDescendant(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isStringTypeDescendant(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
/**
 * @deprecated use 'isTypeDeclarationDescendant'
 */
export declare function isTypeDeclarationSibling(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isMethodBaseSibling(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isSecuritySchemePartType(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isMediaTypeProperty(p: hl.IProperty): boolean;
export declare function isRAML08Type(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isRAML10Type(type: hl.INodeDefinition | hl.ITypeDefinition): boolean;
export declare function isRAML08Node(node: hl.IHighLevelNode): boolean;
export declare function isRAML08Attribute(node: hl.IAttribute): boolean;
export declare function isRAML10Node(node: hl.IHighLevelNode): boolean;
export declare function isRAML10Attribute(node: hl.IAttribute): boolean;
