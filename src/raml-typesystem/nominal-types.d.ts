import ti = require("./nominal-interfaces");
import tsInterfaces = require("./typesystem-interfaces");
export declare type IAnnotation = ti.IAnnotation;
export declare type ITypeDefinition = ti.ITypeDefinition;
export declare type IExpandableExample = ti.IExpandableExample;
export declare type IUniverse = ti.IUniverse;
export declare type IUnionType = ti.IUnionType;
export declare type IProperty = ti.IProperty;
export declare type IArrayType = ti.IArrayType;
export declare type NamedId = ti.NamedId;
export declare type IExternalType = ti.IExternalType;
export declare type FacetValidator = ti.FacetValidator;
export declare type IPrintDetailsSettings = ti.IPrintDetailsSettings;
export declare type IAnnotationType = ti.IAnnotationType;
export declare type INamedEntity = ti.INamedEntity;
export interface Injector {
    inject(a: Adaptable): void;
}
export declare function registerInjector(i: Injector): void;
export declare class Adaptable {
    private adapters;
    private static CLASS_IDENTIFIER_Adaptable;
    static isInstance(instance: any): instance is Adaptable;
    getClassIdentifier(): string[];
    addAdapter(q: any): void;
    constructor();
    getAdapter<T>(adapterType: {
        new (p?: any): T;
    }): T;
    getAdapters(): any[];
}
export declare class Described extends Adaptable {
    private _name;
    private _description;
    constructor(_name: string, _description?: string);
    nameId(): string;
    description(): string;
    private _tags;
    private _version;
    private _annotations;
    private static CLASS_IDENTIFIER_Described;
    static isInstance(instance: any): instance is Described;
    getClassIdentifier(): string[];
    addAnnotation(a: IAnnotation): void;
    removeAnnotation(a: IAnnotation): void;
    annotations(): any[];
    tags(): string[];
    withDescription(d: string): this;
    setName(name: string): void;
}
export declare class Annotation extends Described implements IAnnotation {
    private type;
    private parameters;
    constructor(type: IAnnotationType, parameters: {
        [name: string]: any;
    });
    parameterNames(): string[];
    parameter(name: string): any;
    getType(): ti.IAnnotationType;
}
export declare class Empty {
}
export declare class AbstractType extends Described implements ITypeDefinition {
    _universe: IUniverse;
    private _path;
    _key: NamedId;
    _isCustom: boolean;
    _customProperties: IProperty[];
    properties(): IProperty[];
    externalInHierarchy(): ExternalType;
    private _props;
    protected _allFacets: IProperty[];
    protected _facets: IProperty[];
    addFacet(q: IProperty): void;
    _validator: (x: any) => tsInterfaces.IStatus[];
    validate(x: any): tsInterfaces.IStatus[];
    allFacets(ps?: {
        [name: string]: ITypeDefinition;
    }): IProperty[];
    facets(): IProperty[];
    facet(name: string): ti.IProperty;
    typeId(): string;
    allProperties(ps?: {
        [name: string]: ITypeDefinition;
    }): IProperty[];
    property(propName: string): IProperty;
    hasValueTypeInHierarchy(): boolean;
    isAnnotationType(): boolean;
    hasStructure(): boolean;
    key(): NamedId;
    _superTypes: ITypeDefinition[];
    _subTypes: ITypeDefinition[];
    _requirements: ti.ValueRequirement[];
    private _fixedFacets;
    private _fixedBuildInFacets;
    hasArrayInHierarchy(): boolean;
    arrayInHierarchy(): IArrayType;
    uc: boolean;
    unionInHierarchy(): IUnionType;
    hasExternalInHierarchy(): boolean;
    hasUnionInHierarchy(): boolean;
    fixFacet(name: string, v: any, builtIn?: boolean): void;
    protected _af: {
        [name: string]: any;
    };
    protected _abf: {
        [name: string]: any;
    };
    /**
     * @deprecated
     */
    getFixedFacets(): {
        [name: string]: any;
    };
    fixedFacets(): {
        [name: string]: any;
    };
    fixedBuiltInFacets(): {
        [name: string]: any;
    };
    protected collectFixedFacets(builtIn: boolean): {
        [name: string]: any;
    };
    allFixedFacets(): {
        [name: string]: any;
    };
    allFixedBuiltInFacets(): {
        [name: string]: any;
    };
    protected collectAllFixedFacets(builtIn: boolean): {
        [name: string]: any;
    };
    protected contributeFacets(x: {
        [name: string]: any;
    }): void;
    private _nameAtRuntime;
    getPath(): string;
    setNameAtRuntime(name: string): void;
    getNameAtRuntime(): string;
    constructor(_name: string, _universe?: IUniverse, _path?: string);
    universe(): IUniverse;
    superTypes(): ITypeDefinition[];
    isAssignableFrom(typeName: string): boolean;
    annotationType(): IAnnotationType;
    subTypes(): ITypeDefinition[];
    allSubTypes(): ITypeDefinition[];
    _allSupers: ITypeDefinition[];
    allSuperTypes(): ITypeDefinition[];
    private allSuperTypesRecurrent(t, m, result);
    addSuperType(q: AbstractType): void;
    addRequirement(name: string, value: string): void;
    valueRequirements(): ti.ValueRequirement[];
    requiredProperties(): IProperty[];
    printDetails(indent?: string, settings?: IPrintDetailsSettings): string;
    private getTypeClassName();
    buildIn: boolean;
    private isStandardSuperclass(nameId, className);
    /**
     * Returns example for this type.
     * Returned example should be tested for being empty and being expandable.
     */
    examples(collectFromSupertype?: boolean): IExpandableExample[];
    /**
     * Returns whether this type contain genuine user defined type in its hierarchy.
     * Genuine user defined type is a type user intentionally defined and filled with
     * properties or facets, or having user-defined name as opposed to a synthetic user-defined type.
     */
    isGenuineUserDefinedType(): boolean;
    /**
     * Returns nearest genuine user-define type in the hierarchy.
     * Genuine user defined type is a type user intentionally defined and filled with
     * properties or facets, or having user-defined name as opposed to a synthetic user-defined type.
     */
    genuineUserDefinedTypeInHierarchy(): ITypeDefinition;
    /**
     * Returns whether this type contain genuine user defined type in its hierarchy.
     * Genuine user defined type is a type user intentionally defined and filled with
     * properties or facets, or having user-defined name as opposed to a synthetic user-defined type.
     */
    hasGenuineUserDefinedTypeInHierarchy(): boolean;
    customProperties(): IProperty[];
    allCustomProperties(): IProperty[];
    registerCustomProperty(p: IProperty): void;
    setCustom(val: boolean): void;
    isCustom(): boolean;
    isUnion(): boolean;
    union(): IUnionType;
    isExternal(): boolean;
    external(): IExternalType;
    isArray(): boolean;
    isObject(): boolean;
    array(): IArrayType;
    isValueType(): boolean;
    kind(): string[];
    isBuiltIn(): boolean;
    setBuiltIn(builtIn: boolean): void;
    isTopLevel(): boolean;
    isUserDefined(): boolean;
    putExtra(extraName: string, value: any): void;
    getExtra(name: string): any;
    private getExtraAdapter();
}
export declare class ValueType extends AbstractType implements ITypeDefinition {
    constructor(name: string, _universe?: IUniverse, path?: string, description?: string);
    hasStructure(): boolean;
    hasValueTypeInHierarchy(): boolean;
    isValueType(): boolean;
    isUnionType(): boolean;
    isObject(): boolean;
}
export declare class StructuredType extends AbstractType implements ITypeDefinition {
    _properties: IProperty[];
    hasStructure(): boolean;
    propertyIndex(name: string): number;
    addProperty(name: string, range: ITypeDefinition): Property;
    allPropertyIndex(name: string): number;
    properties(): IProperty[];
    registerProperty(p: IProperty): void;
}
export declare class Property extends Described implements IProperty {
    private _ownerClass;
    private _nodeRange;
    protected _groupName: string;
    protected _keyShouldStartFrom: string;
    protected _enumOptions: string[];
    private _isRequired;
    private _isMultiValue;
    private _defaultValue;
    private _descriminates;
    private _defaultBooleanValue;
    private _defaultIntegerValue;
    private static CLASS_IDENTIFIER_Property;
    static isInstance(instance: any): instance is Property;
    getClassIdentifier(): string[];
    withMultiValue(v?: boolean): this;
    withDescriminating(b: boolean): this;
    withRequired(req: boolean): this;
    isRequired(): boolean;
    withKeyRestriction(keyShouldStartFrom: string): this;
    withDomain(d: StructuredType, custom?: boolean): Property;
    setDefaultVal(s: any): this;
    setDefaultBooleanVal(s: any): this;
    setDefaultIntegerVal(s: any): this;
    defaultValue(): any;
    isPrimitive(): boolean;
    withRange(t: ITypeDefinition): this;
    isValueProperty(): boolean;
    enumOptions(): string[];
    keyPrefix(): string;
    withEnumOptions(op: string[]): this;
    _keyRegexp: string;
    withKeyRegexp(regexp: string): this;
    getKeyRegexp(): string;
    matchKey(k: string): boolean;
    private facetValidator;
    getFacetValidator(): ti.FacetValidator;
    setFacetValidator(f: FacetValidator): void;
    domain(): StructuredType;
    range(): ITypeDefinition;
    isMultiValue(): boolean;
    isDescriminator(): boolean;
}
export declare class Union extends AbstractType implements IUnionType {
    left: ITypeDefinition;
    right: ITypeDefinition;
    key(): NamedId;
    leftType(): ITypeDefinition;
    rightType(): ITypeDefinition;
    isUserDefined(): boolean;
    unionInHierarchy(): this;
    union(): this;
    hasUnionInHierarchy(): boolean;
    isUnion(): boolean;
    isObject(): boolean;
    hasArrayInHierarchy(): boolean;
}
export declare class Array extends AbstractType implements IArrayType {
    dimensions: number;
    component: ITypeDefinition;
    hasArrayInHierarchy(): boolean;
    isArray(): boolean;
    isObject(): boolean;
    arrayInHierarchy(): this;
    array(): this;
    isUserDefined(): boolean;
    componentType(): ti.ITypeDefinition;
    setComponent(t: ITypeDefinition): void;
    key(): NamedId;
}
export declare class ExternalType extends StructuredType implements IExternalType {
    schemaString: string;
    externalInHierarchy(): this;
    typeId(): string;
    schema(): string;
    isUserDefined(): boolean;
    hasExternalInHierarchy(): boolean;
    isExternal(): boolean;
    external(): this;
}
