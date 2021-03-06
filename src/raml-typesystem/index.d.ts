export import tsInterfaces = require("./typesystem-interfaces");
export import nominalTypes = require("./nominal-types");
export import nominalInterfaces = require("./nominal-interfaces");
export import typeExpressions = require("./typeExpressionUtil");
export declare type IValidationPath = tsInterfaces.IValidationPath;
export declare type IHasExtra = tsInterfaces.IHasExtra;
export declare var TOP_LEVEL_EXTRA: string;
export declare var DEFINED_IN_TYPES_EXTRA: string;
export declare var USER_DEFINED_EXTRA: string;
export declare var SOURCE_EXTRA: string;
export declare function getSchemaUtils(): any;
export declare type IStatus = tsInterfaces.IStatus;
export declare type ITypeFacet = tsInterfaces.ITypeFacet;
export declare type IConstraint = tsInterfaces.IConstraint;
export declare type IParsedTypeCollection = tsInterfaces.IParsedTypeCollection;
export declare type ITypeRegistry = tsInterfaces.ITypeRegistry;
export declare type IParsedType = tsInterfaces.IParsedType;
export declare type IPropertyInfo = tsInterfaces.IPropertyInfo;
export declare function isParsedType(object: any): object is IParsedType;
export interface Open {
    /**
     * this index signature is here to specify that IType can contain unknown user defined facets and annotations
     */
    [name: string]: any;
}
/**
 * this interface describes basic layout of JSON type representation,
 * sub interfaces contains documentation about important facets which can be specified for the types extended from related built-in types
 */
export interface IType extends Open {
    /**
     * type expression describing super types or in case of multiple inheritance array of type expressions
     */
    type?: string | string[];
    /**
     * default value for the type
     */
    default?: any;
    /**
     * example for the type
     */
    example?: any;
    /**
     * human readable description of the type (GitHub Markdown)
     */
    description?: string;
    /**
     * human readable short name of the type
     */
    displayName?: string;
    /**
     * map of custom facets declarations
     */
    facets?: {
        [name: string]: IType;
    };
    /**
     * enumeration of possible valid instances for the type
     */
    enum?: any[];
}
/**
 * this interface constains additional properties specific to object types
 */
export interface ObjectType extends IType {
    /**
     * minimum amount of properties which instances of the type should have
     */
    minProperties?: number;
    /**
     * maximum amount of properties which instances of the type should have
     */
    maxProperties?: number;
    /**
     * if set to true type is threaten as closed type
     */
    closed?: boolean;
    /**
     * map of property signatures to the property  declarations
     */
    properties?: {
        [name: string]: IType;
    };
    /**
     * allows to set constraints on the type of additional properties
     */
    additionalProperties?: boolean;
}
/**
 * this interface contains additional properties specific to array types
 */
export interface ArrayType extends IType {
    /**
     * minimum amount of properties which instances of the type should have
     */
    minItems?: number;
    /**
     * maximum amount of properties which instances of the type should have
     */
    maxItems?: number;
    /**
     * contains description of the component type
     */
    items?: string | IType;
}
/**
 * this interface contains additional properties specific to number types
 */
export interface NumberType extends IType {
    /**
     * minimum value for this type
     */
    minimum?: number;
    /**
     * maximum value for this type
     */
    maximim?: number;
    /**
     * value for multiple of constraint
     */
    multipleOf?: number;
}
/**
 * this interface contains additional properties specific to string types
 */
export interface StringType extends IType {
    /**
     * regular expression which all instances of the type should pass
     */
    pattern?: string;
    /**
     * minimum length of the string
     */
    minLength?: number;
    /**
     * maximum length of the string
     */
    maxLength?: number;
}
/**
 * this interface represents JSON representation of the Library
 */
export interface ITypeCollection {
    /**
     * map of annotation type name to annotation type description
     */
    annotationTypes?: {
        [name: string]: IType;
    };
    /**
     * map of normal type name to type description
     */
    types?: {
        [name: string]: IType;
    };
}
/**
 * loads type collection from JSON type definition
 * @param data
 * @param registry - optional registry of types which ar already known (does not modified during parse)
 * @returns {TypeCollection} returns a new instance of type collection with a parsed types
 */
export declare function loadTypeCollection(data: ITypeCollection, registry?: ITypeRegistry): IParsedTypeCollection;
/**
 * loads type  from JSON type definition
 * @param data
 * @returns {ts.AbstractType}
 */
export declare function loadType(data: IType): IParsedType;
/**
 * parses a type or type collection definition from a JSON structure
 * @param data
 * @returns {any}
 */
export declare function parse(data: IType | ITypeCollection): IParsedType | IParsedTypeCollection;
/**
 * parses a type  from a JSON structure, uses second argument to resolve types
 * @param data
 * @returns {any}
 */
export declare function parseType(data: IType, collection: IParsedTypeCollection): IParsedType;
/**
 * kind of the node
 */
export declare enum NodeKind {
    SCALAR = 0,
    ARRAY = 1,
    MAP = 2,
}
/**
 * node representing an element of abstract syntax tree
 */
export interface IParseNode {
    /**
     * node key
     */
    key(): string;
    /**
     * node value
     */
    value(): any;
    /**
     * node children
     */
    children(): IParseNode[];
    /**
     * child with a given key
     * @param k
     */
    childWithKey(k: string): IParseNode;
    /**
     * kind of the node
     */
    kind(): NodeKind;
}
/**
 * parses type collection definition from a JSON structure
 * @param data
 * @returns {any}
 */
export declare function parseFromAST(data: IParseNode): IParsedTypeCollection;
/**
 * parses type collection definition from a JSON structure
 * @param data
 * @returns {any}
 */
export declare function parseTypeFromAST(name: string, data: IParseNode, collection: IParsedTypeCollection, defaultsToAny?: boolean, annotation?: boolean, global?: boolean, ignoreTypeAttr?: boolean): IParsedType;
/**
 * dumps type or type collection to JSON
 * @param ts
 * @returns {IType|ITypeCollection}
 */
export declare function dump(ts: IParsedType | IParsedTypeCollection): ITypeCollection | IType;
/**
 * validates intance against the type definition
 * @param i - instance to validate
 * @param t - type definition
 * @returns {IStatus}
 */
export declare function validate(i: any, t: IParsedType, autoClose?: boolean): IStatus;
/***
 * validates type definition
 * @param t
 * @param collection - collection of the types
 * @returns {IStatus}
 */
export declare function validateTypeDefinition(t: IParsedType, collection: IParsedTypeCollection): IStatus;
/**
 * performs automatic classification of instance against a given type
 * @param i
 * @param t
 * @returns {IParsedType}
 */
export declare function performAC(i: any, t: IParsedType): IParsedType;
/**
 * checks if the given type is suitable for automatic classification
 * @param t
 * @returns {Status}
 */
export declare function checkACStatus(t: IParsedType): IStatus;
export interface IFacetPrototype {
    /**
     *creates brand new instance of facet filled with default values
     */
    newInstance(): ITypeFacet;
    /**
     * creates a facet filled with a passed value
     * @param v
     */
    createWithValue(v: any): ITypeFacet;
    /**
     * checks if the facet represented by this prototype can be added to the given type
     * @param t
     */
    isApplicable(t: IParsedType): boolean;
    /**
     * returns true if this facet is inheritable
     */
    isInheritable(): boolean;
    /**
     * returns true if this facet is a constraint
     */
    isConstraint(): boolean;
    /**
     * returns true if this facet describes a metadata
     */
    isMeta(): boolean;
    /**
     * returns the name of the facet represented by this prototype
     */
    name(): string;
}
/**
 * this function allow you to get a list of all built-in facets
 * @returns {FacetPrototype[]}
 */
export declare function builtInFacets(): IFacetPrototype[];
/**
 * returns type registry returning all built in types
 * @returns {TypeRegistry}
 */
export declare function builtInTypes(): ITypeRegistry;
/**
 * creates a new type by deriving it from a list of super types
 * @returns {IParsedType}
 */
export declare function derive(name: string, ...types: IParsedType[]): IParsedType;
/**
 * creates a new type by unifying it from a list of possible options
 * @returns {IParsedType}
 */
export declare function unify(name: string, ...types: IParsedType[]): IParsedType;
export declare class TypeConstructor {
    private target;
    constructor(target: IParsedType);
    /**
     * adds property declaration to the type
     * @param name
     * @param type
     * @param optional
     * @returns {TypeConstructor}
     */
    addProperty(name: string, type: IParsedType, optional: boolean): TypeConstructor;
    /**
     * closes type
     * @returns {TypeConstructor}
     */
    closeType(): TypeConstructor;
    /**
     * adds annotation to the type
     * @returns {TypeConstructor}
     */
    annotate(name: string, value: any): TypeConstructor;
    /**
     * adds custom facet to the type
     * @returns {TypeConstructor}
     */
    customFacet(name: string, value: any): TypeConstructor;
    /**
     * adds custom facet declaration to the type
     * @returns {TypeConstructor}
     */
    customFacetDeclaration(name: string, value: IParsedType, optional?: boolean): TypeConstructor;
    /**
     * adds a built-in facet with a given name and value
     * @param name
     * @param value
     * @returns {TypeConstructor}
     */
    addSimpleFacet(name: string, value: any): TypeConstructor;
    /**
     * returns a constructed type instance
     * @returns {IParsedType}
     */
    getResult(): tsInterfaces.IParsedType;
}
export declare function setPropertyConstructor(c: any): void;
export declare function toNominal(t: IParsedType, bt: (name: string) => nominalTypes.ITypeDefinition): nominalTypes.ITypeDefinition;
export declare function toValidationPath(p: string): tsInterfaces.IValidationPath;
