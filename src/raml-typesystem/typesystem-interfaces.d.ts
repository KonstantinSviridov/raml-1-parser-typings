export interface IValidationPath {
    name: string | number;
    child?: IValidationPath;
}
export interface IHasExtra {
    getExtra(name: string): any;
    putExtra(name: string, value: any): void;
}
export declare const REPEAT = "repeat";
export declare const PARSE_ERROR = "parseError";
export declare const TOP_LEVEL_EXTRA = "topLevel";
export declare const DEFINED_IN_TYPES_EXTRA = "definedInTypes";
export declare const USER_DEFINED_EXTRA = "USER_DEFINED";
export declare const SOURCE_EXTRA = "SOURCE";
export declare const SCHEMA_AND_TYPE_EXTRA = "SCHEMA";
export declare const GLOBAL_EXTRA = "GLOBAL";
export declare const HAS_FACETS = "HAS_FACETS";
export declare const HAS_ITEMS = "HAS_ITEMS";
export interface IStatus extends IHasExtra {
    /**
     * returns true if status does not have errors
     */
    isOk(): boolean;
    /**
     * return true if this status contains a warning
     */
    isWarning(): boolean;
    /**
     * return true if this status contains a error
     */
    isError(): boolean;
    /**
     * return true if this status is just information
     */
    isInfo(): boolean;
    /**
     * returns human readable message associated with this status
     */
    getMessage(): string;
    setMessage(m: string): void;
    /**
     * returns an array of nested statuses
     */
    getSubStatuses(): IStatus[];
    /**
     * return an object which raised this status
     */
    getSource(): any;
    /**
     * returns primitive error statuses gathered recurrently, returns warnings to.
     */
    getErrors(): IStatus[];
    getValidationPath(): IValidationPath;
    setValidationPath(p: IValidationPath): void;
    /**
     * returns path to this status
     */
    getValidationPathAsString(): string;
    /**
     * Unique identifier
     */
    getCode(): string;
    setCode(c: string): void;
    getSeverity(): number;
    getInternalRange(): RangeObject;
    getInternalPath(): IValidationPath;
    getFilePath(): string;
}
export declare enum MetaInformationKind {
    Description = 0,
    NotScalar = 1,
    ImportedByChain = 2,
    AcceptAllScalarsAsStrings = 3,
    SkipValidation = 4,
    DisplayName = 5,
    Usage = 6,
    Annotation = 7,
    FacetDeclaration = 8,
    CustomFacet = 9,
    Example = 10,
    Required = 11,
    HasPropertiesFacet = 12,
    AllowedTargets = 13,
    Examples = 14,
    XMLInfo = 15,
    Default = 16,
    Constraint = 17,
    Modifier = 18,
    Discriminator = 19,
    DiscriminatorValue = 20,
}
/**
 * this is a common super interface for restrictions and meta data
 */
export interface ITypeFacet {
    /**
     * name of the facet
     */
    facetName(): string;
    /**
     * broadest type to which this facet can be added
     */
    requiredType(): IParsedType;
    /**
     * returns a type to which this facet  belongs
     */
    owner(): IParsedType;
    /**
     * return true if this facet is inheritable
     */
    isInheritable(): boolean;
    /**
     * validates if the facet is configured properly
     * @param registry
     */
    validateSelf(registry: ITypeRegistry): IStatus;
    /**
     * returns value associated with the facet
     */
    value(): any;
    /**
     * Returns kind of meta-information this instance represents.
     */
    kind(): MetaInformationKind;
    /**
     * Annotations applied to the facet
     */
    annotations(): IAnnotation[];
    isConstraint(): boolean;
}
export interface IConstraint extends ITypeFacet {
    composeWith(r: IConstraint): IConstraint;
}
/**
 * Model of annotation instances applied to types or their facets
 */
export interface IAnnotation extends ITypeFacet {
    /**
     * Returns owner facet for annotations applied to facets
     */
    ownerFacet(): ITypeFacet;
    /**
     * Returns owner type for annotations applied to types
     */
    owner(): IParsedType;
}
export interface IParsedTypeCollection {
    /**
     * returns a type for a given name
     * @param name
     */
    getType(name: string): IParsedType;
    /**
     * adds a type to collection
     * @param t
     */
    add(t: IParsedType): void;
    /**
     * adds annotation type
     * @param t
     */
    addAnnotationType(t: IParsedType): void;
    /**
     * returns annotation type for a given name
     * @param name
     */
    getAnnotationType(name: string): IParsedType;
    /**
     * lists the types defined in this collection
     */
    types(): IParsedType[];
    /**
     * lists annotation types defined in this collection
     */
    annotationTypes(): IParsedType[];
    getTypeRegistry(): ITypeRegistry;
    getAnnotationTypeRegistry(): ITypeRegistry;
    library(name: string): IParsedTypeCollection;
}
export interface ITypeRegistry {
    /**
     * returns a type associated with a given name
     * @param name
     */
    get(name: string): IParsedType;
    /**
     * list all types stored in this registry
     */
    types(): IParsedType[];
    /**
     * Retrieve type if it is available through a library chain
     * @param name type name
     */
    getByChain(name: string): IParsedType;
}
export interface IPropertyInfo {
    name(): string;
    required(): boolean;
    range(): IParsedType;
    declaredAt(): IParsedType;
    isPattern(): boolean;
    isAdditional(): boolean;
}
/**
 * parsed representation of the type
 * you should not create instances of this interfaces manually
 */
export interface IParsedType extends IHasExtra {
    /**
     * returns  list of directly declared sub types of this type
     */
    subTypes(): IParsedType[];
    /**
     * returns  list of directly declared super types of this type
     */
    superTypes(): IParsedType[];
    /**
     * name of the type
     */
    name(): string;
    examples(): IExample[];
    allOptions(): IParsedType[];
    /**
     * returns full list of known types which inherit from this type.
     * Note: built-in types does not list their not built in sub types
     */
    allSubTypes(): IParsedType[];
    /**
     * returns full list of ancestor types
     */
    allSuperTypes(): IParsedType[];
    annotations(): IAnnotation[];
    annotation(name: string): any;
    declaredAnnotations(): IAnnotation[];
    registry(): IParsedTypeCollection;
    isAssignableFrom(t: IParsedType): boolean;
    componentType(): IParsedType;
    properties(): IPropertyInfo[];
    declaredProperties(): IPropertyInfo[];
    definedFacets(): IPropertyInfo[];
    allDefinedFacets(): IPropertyInfo[];
    property(name: string): IPropertyInfo;
    /**
     * validates a potential instance of type and returns a status describing the results of validation
     * @param i
     */
    validate(i: any, autoClose?: boolean): IStatus;
    validateType(reg?: ITypeRegistry): IStatus;
    ac(i: any): IParsedType;
    canDoAc(i: any): IStatus;
    /**
     * returns all meta information and restrictions associated with the type all inheritable facets from super types are included
     */
    allFacets(): ITypeFacet[];
    exampleObject(): any;
    /**
     * returns  meta information and restrictions associated with the type only declared facets are included
     */
    declaredFacets(): ITypeFacet[];
    /**
     * returns array of custom facets directly declared on this type
     */
    customFacets(): ITypeFacet[];
    allCustomFacets(): ITypeFacet[];
    /**
     * returns array of custom facets directly declared on this type
     */
    restrictions(): ITypeFacet[];
    /**
     * returns true if this type is anonimous
     */
    isAnonymous(): boolean;
    /**
     * returns true if this type is empty
     */
    isEmpty(): boolean;
    /**
     * returns true if this type inherits from object type
     */
    isObject(): boolean;
    /**
     * returns true if this type inherits external type
     */
    isExternal(): boolean;
    /**
     * returns true if this type inherits from string type
     */
    isString(): boolean;
    /**
     * returns true if this type inherits from number type
     */
    isNumber(): boolean;
    /**
     * returns true if this type is builtin
     */
    isBuiltin(): boolean;
    /**
     * returns true if this type inherits from boolean type
     */
    isBoolean(): boolean;
    /**
     * returns true if this type inherits from integer type
     */
    isInteger(): boolean;
    /**
     * returns true if this type inherits from one of date related types
     */
    isDateTime(): boolean;
    /**
     * returns true if this type inherits from one of date related types
     */
    isDateOnly(): boolean;
    /**
     * returns true if this type inherits from one of date related types
     */
    isTimeOnly(): boolean;
    /**
     * returns true if this type inherits from one of date related types
     */
    isDateTimeOnly(): boolean;
    /**
     * returns true if this type inherits from array type
     */
    isArray(): boolean;
    /**
     * returns true if this type inherits from scalar type
     */
    isScalar(): boolean;
    /**
     * returns true if this type is a union type
     */
    isUnion(): boolean;
    /**
     * returns true if this type is an intersection type
     */
    isIntersection(): boolean;
    /**
     * returns true if this type inhetits from an unknown type
     */
    isUnknown(): boolean;
    /**
     * return true if this type inherits from a file type
     */
    isFile(): boolean;
    /**
     * returns true if this type has recurrent definition;
     */
    isRecurrent(): boolean;
    /**
     * Straightforward set of components. E.g. for `A|(B|C)` where `A`, `B` and `C`
     * are not union types the result is `[A, B|C]`
     */
    options(): IParsedType[];
    cloneWithFilter(x: (y: ITypeFacet, transformed?: IParsedType) => boolean | ITypeFacet, f?: (t: IParsedType) => IParsedType): IParsedType;
    kind(): string;
}
/**
 * Type defined by a set of types, e.g. union or intersection type
 */
export interface IDerivedType extends IParsedType {
    /**
     * Straightforward set of components. E.g. for `A|(B|C)` where `A`, `B` and `C`
     * are not union types the result is `[A, B|C]`
     */
    options(): IParsedType[];
    /**
     * Expanded set of components. E.g. for `A|(B|C)` where `A`, `B` and `C`
     * are not union types the result is `[A, B, C]`
     */
    allOptions(): IParsedType[];
}
/**
 * A model of custom type validation plugin
 */
export interface ITypeValidationPlugin {
    /**
     * @param t the type to be validated
     * @param reg context type registry
     */
    process(t: IParsedType, reg: ITypeRegistry): PluginValidationIssue[];
    /**
     * String ID of the plugin
     */
    id(): string;
}
/**
 * Retrieve a list of registered type validation plugins
 */
export declare function getTypeValidationPlugins(): ITypeValidationPlugin[];
/**
 * Model of annotation instance used as input fo validation plugins
 */
export interface IAnnotationInstance {
    /**
     * Annotation name
     */
    name(): string;
    /**
     * Annotation value
     */
    value(): any;
    /**
     * Annotation definition type
     */
    definition(): IParsedType;
}
export interface PluginValidationIssue {
    issueCode?: string;
    message?: string;
    isWarning?: boolean;
    path?: IValidationPath;
}
/**
 * Model of annotation validator for typesystem
 */
export interface IAnnotationValidationPlugin {
    /**
     * validate annotated RAML element
     */
    process(entry: IAnnotatedElement): PluginValidationIssue[];
    /**
     * String ID of the plugin
     */
    id(): string;
}
/**
 * A model of annotated RAML element used as input for
 * annotation validation plugins
 */
export interface IAnnotatedElement {
    /**
     * Element kind
     */
    kind(): string;
    /**
     * Map view on the annotations applied
     */
    annotationsMap(): {
        [key: string]: IAnnotationInstance;
    };
    /**
     * Array view on the annotations applied
     */
    annotations(): IAnnotationInstance[];
    /**
     * JSON representation of the entry
     */
    value(): any;
    /**
     * Element name
     */
    name(): string;
    /**
     * The element itself
     */
    entry(): any;
}
export interface IExample {
    name(): string;
    strict(): boolean;
    value(): any;
    annotationsMap(): {
        [key: string]: IAnnotation[];
    };
    annotations(): IAnnotation[];
}
/**
 * Retrieve a list of registered type validation plugins
 */
export declare function getAnnotationValidationPlugins(): IAnnotationValidationPlugin[];
export interface MarkerObject {
    /**
     * Line number, starting from zero
     */
    line: number;
    /**
     * Column number, starting from zero
     */
    column: number;
    /**
     * Position, starting from zero
     */
    position: number;
}
export interface RangeObject {
    start: MarkerObject;
    end: MarkerObject;
}
