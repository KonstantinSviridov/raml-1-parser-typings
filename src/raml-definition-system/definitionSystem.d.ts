export import rt = require("../raml-typesystem/index");
import typeSystem = rt.nominalTypes;
export declare function getSchemaUtils(): any;
export declare type IHighLevelNode = any;
export declare type IParseResult = any;
export declare type Named = typeSystem.NamedId;
export declare type IHasExtra = rt.IHasExtra;
export declare var TOP_LEVEL_EXTRA: string;
export declare var DEFINED_IN_TYPES_EXTRA: string;
export declare var USER_DEFINED_EXTRA: string;
export declare var SOURCE_EXTRA: string;
export declare var tsInterfaces: typeof rt.tsInterfaces;
export declare var injector: {
    inject(a: typeSystem.Adaptable): void;
};
/**
 * What is our universe at first we have node types
 * they have following fundamental properties:
 * some nodes can fold to another kinds of nodes
 *
 */
export declare type IType = typeSystem.ITypeDefinition;
export declare type ITypeDefinition = typeSystem.ITypeDefinition;
export declare type IProperty = typeSystem.IProperty;
export declare class AbstractType extends typeSystem.AbstractType implements typeSystem.ITypeDefinition {
}
export declare class ValueType extends typeSystem.ValueType implements IType {
}
export declare class SourceProvider {
    static CLASS_IDENTIFIER: string;
    static isInstance(instance: any): instance is SourceProvider;
    getClassIdentifier(): string[];
    getSource(): any;
}
export declare function isSourceProvider(object: any): object is SourceProvider;
export declare class EnumType extends ValueType {
    private static CLASS_IDENTIFIER;
    static isInstance(instance: any): instance is EnumType;
    getClassIdentifier(): string[];
    values: string[];
}
export interface IValueDocProvider {
    (v: string): string;
}
export interface IValueSuggester {
    (node: IHighLevelNode): string[];
}
export declare class ReferenceType extends ValueType {
    private referenceTo;
    private static CLASS_IDENTIFIER;
    static isInstance(instance: any): instance is ReferenceType;
    getClassIdentifier(): string[];
    constructor(name: string, path: string, referenceTo: string, _universe: Universe);
    getReferencedType(): NodeClass;
    hasStructure(): boolean;
}
export declare class NodeClass extends typeSystem.StructuredType implements IType, typeSystem.ITypeDefinition {
    private static CLASS_IDENTIFIER;
    static isInstance(instance: any): instance is NodeClass;
    getClassIdentifier(): string[];
    constructor(_name: string, universe: Universe, path: string, _description?: string);
    allProperties(v?: {
        [name: string]: typeSystem.ITypeDefinition;
    }): Property[];
}
export declare class UserDefinedClass extends NodeClass {
    private static CLASS_IDENTIFIER_UserDefinedClass;
    static isInstance(instance: any): instance is UserDefinedClass;
    getClassIdentifier(): string[];
    key(): any;
    isUserDefined(): boolean;
    typeId(): string;
    constructor(name: string, universe: Universe, hl: IHighLevelNode, path: string, description: string);
    _value: boolean;
    hasValueTypeInHierarchy(): boolean;
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
    genuineUserDefinedType(): typeSystem.ITypeDefinition;
}
/**
 * Instanceof for UserDefinedClass class.
 * @param clazz
 * @returns
 */
export declare function isUserDefinedClass(clazz: any): clazz is UserDefinedClass;
export declare class AnnotationType extends UserDefinedClass {
    allProperties(ps?: {
        [name: string]: typeSystem.ITypeDefinition;
    }): Property[];
    isAnnotationType(): boolean;
}
export interface IUniverseDescriptor {
    [name: string]: typeSystem.NamedId;
}
export declare class Universe extends typeSystem.Described implements typeSystem.IUniverse {
    private _parent;
    private _classes;
    private _uversion;
    private _topLevel;
    private _originalTopLevelText;
    private matchedObjects;
    private _typedVersion;
    matched(): IUniverseDescriptor;
    setTopLevel(t: string): void;
    getTopLevel(): string;
    setOriginalTopLevelText(t: string): void;
    getOriginalTopLevelText(): string;
    setTypedVersion(tv: string): void;
    getTypedVersion(): string;
    version(): string;
    setUniverseVersion(version: string): void;
    types(): IType[];
    type(name: string): ITypeDefinition;
    register(t: IType): this;
    private aMap;
    registerAlias(a: string, t: IType): void;
    unregister(t: IType): this;
    constructor(dec: IUniverseDescriptor, name?: string, _parent?: Universe, v?: string);
    registerSuperClass(t0: IType, t1: IType): void;
}
export declare function prop(name: string, desc: string, domain: NodeClass, range: IType, custom?: boolean): Property;
export declare class ChildValueConstraint {
    name: string;
    value: string;
    constructor(name: string, value: string);
}
export declare class Property extends typeSystem.Property implements typeSystem.IProperty {
    private _isFromParentValue;
    private _isFromParentKey;
    private _key;
    private _declaresFields;
    private _describes;
    private _inheritsValueFromContext;
    private _canBeDuplicator;
    private _allowsNull;
    private _canBeValue;
    private _isInherited;
    private _oftenKeys;
    private _vprovider;
    private _suggester;
    private _selfNode;
    private _noDirectParse;
    private static CLASS_IDENTIFIER_Property_def;
    static isInstance(instance: any): instance is Property;
    getClassIdentifier(): string[];
    isPrimitive(): boolean;
    withNoDirectParse(): void;
    isNoDirectParse(): boolean;
    withSelfNode(): void;
    isSelfNode(): boolean;
    matchKey(k: string): boolean;
    valueDocProvider(): IValueDocProvider;
    setValueDocProvider(v: IValueDocProvider): this;
    suggester(): IValueSuggester;
    setValueSuggester(s: IValueSuggester): void;
    enumOptions(): string[];
    getOftenKeys(): string[];
    withOftenKeys(keys: string[]): this;
    withCanBeValue(): this;
    withInherited(w: boolean): void;
    isInherited(): boolean;
    isAllowNull(): boolean;
    withAllowNull(): void;
    getCanBeDuplicator(): boolean;
    canBeValue(): boolean;
    setCanBeDuplicator(): boolean;
    inheritedContextValue(): string;
    withInheritedContextValue(v: string): this;
    private _contextReq;
    withContextRequirement(name: string, value: string): void;
    getContextRequirements(): {
        name: string;
        value: string;
    }[];
    withDescribes(a: string): this;
    describesAnnotation(): boolean;
    describedAnnotation(): string;
    private _newInstanceName;
    isReference(): boolean;
    referencesTo(): IType;
    newInstanceName(): string;
    withThisPropertyDeclaresFields(b?: boolean): this;
    isThisPropertyDeclaresTypeFields(): boolean;
    withNewInstanceName(name: string): this;
    private determinesChildValues;
    addChildValueConstraint(c: ChildValueConstraint): void;
    getChildValueConstraints(): ChildValueConstraint[];
    childRestrictions(): {
        name: string;
        value: any;
    }[];
    _id: any;
    id(): any;
    isAnnotation(): boolean;
    withFromParentValue(v?: boolean): this;
    withFromParentKey(v?: boolean): this;
    isFromParentKey(): boolean;
    isFromParentValue(): boolean;
    withGroupName(gname: string): this;
    unmerge(): this;
    merge(): this;
    withKey(isKey: boolean): this;
    /**
     * TODO THIS STUFF SHOULD BE MORE ABSTRACT (LATER...)
     * @param keyShouldStartFrom
     * @returns {Property}
     */
    isKey(): boolean;
    isMerged(): boolean;
    groupName(): string;
    key(): typeSystem.NamedId;
}
export declare type Array = typeSystem.Array;
export declare class UserDefinedProp extends Property {
    private _node;
    private sourceProvider;
    _displayName: string;
    private static CLASS_IDENTIFIER;
    static isInstance(instance: any): instance is UserDefinedProp;
    getClassIdentifier(): string[];
    constructor(name: string, source: IParseResult);
    withDisplayName(name: string): void;
    getDisplayName(): string;
    node(): any;
    setSourceProvider(sourceProvider: SourceProvider): void;
}
export declare class RAMLPropertyDocumentationService {
    private _markdownDescription;
    private _documentationTableName;
    private _isHidden;
    private _valueDescription;
    setDocTableName(val: string): void;
    docTableName(): string;
    setHidden(val: boolean): void;
    isHidden(): boolean;
    setMarkdownDescription(val: string): void;
    markdownDescription(): string;
    setValueDescription(val: string): void;
    valueDescription(): string;
}
export declare class RAMLPropertyParserService extends RAMLPropertyDocumentationService {
    private _isEmbededMap;
    private _isSystemProperty;
    isSystem(): boolean;
    withSystem(s: boolean): this;
    isEmbedMap(): boolean;
    withEmbedMap(): this;
}
export declare class RAMLPropertyService extends RAMLPropertyParserService {
    private _property;
    constructor(_property: IProperty);
    private _meta;
    valueDocProvider(): IValueDocProvider;
    private _propertyGrammarType;
    withPropertyGrammarType(pt: string): void;
    getPropertyGrammarType(): string;
    id(): string;
    range(): ITypeDefinition;
    domain(): ITypeDefinition;
    isAllowNull(): boolean;
    referencesTo(): ITypeDefinition;
    isReference(): boolean;
    texpr: boolean;
    nameId(): string;
    priority(): number;
    isKey(): boolean;
    isMerged(): boolean;
    isTypeExpr(): boolean;
    isExampleProperty(): boolean;
    example: boolean;
    setExample(e: boolean): void;
    setTypeExpression(e: boolean): void;
    isDescriminating(): boolean;
    putMeta(key: string, value: any): void;
    meta(key: string): any;
}
export interface ValueRequirement {
    name: string;
    value: string;
}
export declare class RAMLService {
    private _node;
    private _type;
    private _representationOf;
    private _allowsAnyChildren;
    private _allowsOptionalProperties;
    private _possibleInterfaces;
    withAllowQuestion(): void;
    getAllowQuestion(): boolean;
    private _canInherit;
    withCanInherit(clazz: string): void;
    private _referenceIs;
    getReferenceIs(): string;
    withReferenceIs(fname: string): void;
    descriminatorValue(): string;
    getCanInherit(): string[];
    withAllowAny(): void;
    getAllowAny(): boolean;
    private _declaredBy;
    globallyDeclaredBy(): NodeClass[];
    setGloballyDeclaredBy(c: NodeClass): void;
    setDeclaringNode(n: any): void;
    nameId(): string;
    universe(): Universe;
    isAssignableFrom(name: string): boolean;
    _aliases: string[];
    _consumesRef: boolean;
    _defining: string[];
    setConsumesRefs(b: boolean): void;
    definingPropertyIsEnough(v: string): void;
    getDefining(): string[];
    getConsumesRefs(): boolean;
    private _fDesc;
    addAlias(al: string): void;
    getAliases(): string[];
    valueRequirements(): ValueRequirement[];
    private _allowsValueSet;
    private _allowsValue;
    private _isAnnotation;
    private _annotationChecked;
    private _actuallyExports;
    isAnnotation(): boolean;
    allowValue(): boolean;
    key(): Named;
    getRepresentationOf(): ITypeDefinition;
    constructor(d: ITypeDefinition);
    getPath(): string;
    isDeclaration(): boolean;
    isGlobalDeclaration(): boolean;
    isTypeSystemMember(): boolean;
    getExtendedType(): ITypeDefinition;
    private _runtimeExtenders;
    setInlinedTemplates(b: boolean): this;
    getRuntimeExtenders(): ITypeDefinition[];
    isInlinedTemplates(): boolean;
    setExtendedTypeName(name: string): void;
    getKeyProp(): IProperty;
    private _declaresType;
    private _convertsToGlobal;
    private _isTemplate;
    withActuallyExports(pname: string): void;
    withConvertsToGlobal(pname: string): void;
    getConvertsToGlobal(): string;
    getActuallyExports(): string;
    isUserDefined(): boolean;
    private _contextRequirements;
    withContextRequirement(name: string, value: string): void;
    getContextRequirements(): {
        name: string;
        value: string;
    }[];
    findMembersDeterminer(): IProperty;
    getDeclaringNode(): any;
    registerSupertypes(classNames: string[]): void;
    registerPossibleInterfaces(classNames: string[]): void;
    possibleInterfaces(): ITypeDefinition[];
}
export declare var universesInfo: {
    "Universe08": {
        "GlobalSchema": {
            "name": string;
            "properties": {
                "key": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "value": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Api": {
            "name": string;
            "properties": {
                "title": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "version": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "uriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "mediaType": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schemas": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "traits": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securitySchemes": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "resourceTypes": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "resources": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "documentation": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "RAMLVersion": {
                    "name": string;
                };
            };
        };
        "DocumentationItem": {
            "name": string;
            "properties": {
                "title": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "content": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ValueType": {
            "name": string;
            "properties": {};
        };
        "StringType": {
            "name": string;
            "properties": {};
        };
        "AnyType": {
            "name": string;
            "properties": {};
        };
        "NumberType": {
            "name": string;
            "properties": {};
        };
        "BooleanType": {
            "name": string;
            "properties": {};
        };
        "Referencable": {
            "name": string;
            "properties": {};
        };
        "Reference": {
            "name": string;
            "properties": {
                "structuredValue": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
            };
        };
        "DeclaresDynamicType": {
            "name": string;
            "properties": {};
        };
        "UriTemplate": {
            "name": string;
            "properties": {};
        };
        "RelativeUriString": {
            "name": string;
            "properties": {};
        };
        "FullUriTemplateString": {
            "name": string;
            "properties": {};
        };
        "FixedUri": {
            "name": string;
            "properties": {};
        };
        "MarkdownString": {
            "name": string;
            "properties": {};
        };
        "SchemaString": {
            "name": string;
            "properties": {};
        };
        "JSonSchemaString": {
            "name": string;
            "properties": {};
        };
        "XMLSchemaString": {
            "name": string;
            "properties": {};
        };
        "ExampleString": {
            "name": string;
            "properties": {};
        };
        "StatusCodeString": {
            "name": string;
            "properties": {};
        };
        "JSONExample": {
            "name": string;
            "properties": {};
        };
        "XMLExample": {
            "name": string;
            "properties": {};
        };
        "TypeInstance": {
            "name": string;
            "properties": {
                "properties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "isScalar": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "value": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "TypeInstanceProperty": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "value": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "values": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "isArray": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "RAMLSimpleElement": {
            "name": string;
            "properties": {};
        };
        "Parameter": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "StringTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "pattern": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "enum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "minLength": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "maxLength": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "BooleanTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "NumberTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "minimum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "maximum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "IntegerTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "minimum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "maximum": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "DateTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "FileTypeDeclaration": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "location": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "required": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "default": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "repeat": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ParameterLocation": {
            "name": string;
            "properties": {};
        };
        "MimeType": {
            "name": string;
            "properties": {};
        };
        "BodyLike": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schema": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "formParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schemaContent": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "XMLBody": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schema": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "formParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "JSONBody": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "schema": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "example": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "formParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Response": {
            "name": string;
            "properties": {
                "code": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "Resource": {
            "name": string;
            "properties": {
                "relativeUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "uriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "methods": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "resources": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ResourceTypeRef": {
            "name": string;
            "properties": {
                "resourceType": {
                    "name": string;
                };
            };
        };
        "ResourceType": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "usage": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "methods": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "uriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "MethodBase": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Method": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "method": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "Trait": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "usage": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                };
            };
        };
        "TraitRef": {
            "name": string;
            "properties": {
                "trait": {
                    "name": string;
                };
            };
        };
        "SecuritySchemePart": {
            "name": string;
            "properties": {
                "responses": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "body": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "protocols": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "baseUriParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "queryParameters": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "headers": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "displayName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "is": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "SecuritySchemeSettings": {
            "name": string;
            "properties": {};
        };
        "AbstractSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "SecuritySchemeRef": {
            "name": string;
            "properties": {
                "securitySchemeName": {
                    "name": string;
                };
                "securityScheme": {
                    "name": string;
                };
            };
        };
        "OAuth1SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "requestTokenUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "authorizationUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "tokenCredentialsUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "OAuth2SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "accessTokenUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "authorizationUri": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "authorizationGrants": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "scopes": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "OAuth2SecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "OAuth1SecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "BasicSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "DigestSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "CustomSecurityScheme": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "type": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "description": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "describedBy": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "settings": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
    };
    "Universe10": {
        "Library": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
            };
        };
        "LibraryBase": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
            };
        };
        "Api": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "version": {
                    "name": string;
                };
                "baseUri": {
                    "name": string;
                };
                "baseUriParameters": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "mediaType": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
                "documentation": {
                    "name": string;
                };
                "RAMLVersion": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Overlay": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "version": {
                    "name": string;
                };
                "baseUri": {
                    "name": string;
                };
                "baseUriParameters": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "mediaType": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
                "documentation": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "extends": {
                    "name": string;
                };
            };
        };
        "Extension": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
                "schemas": {
                    "name": string;
                };
                "types": {
                    "name": string;
                };
                "traits": {
                    "name": string;
                };
                "resourceTypes": {
                    "name": string;
                };
                "annotationTypes": {
                    "name": string;
                };
                "securitySchemes": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "version": {
                    "name": string;
                };
                "baseUri": {
                    "name": string;
                };
                "baseUriParameters": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "mediaType": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
                "documentation": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "extends": {
                    "name": string;
                };
            };
        };
        "UsesDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "key": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
            };
        };
        "FragmentDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "uses": {
                    "name": string;
                };
            };
        };
        "DocumentationItem": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "title": {
                    "name": string;
                };
                "content": {
                    "name": string;
                };
            };
        };
        "ValueType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "StringType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "AnyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "NumberType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "IntegerType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "NullType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "TimeOnlyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "DateOnlyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "DateTimeOnlyType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "DateTimeType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "FileType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "BooleanType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "Reference": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "structuredValue": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "name": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "UriTemplate": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "StatusCodeString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "RelativeUriString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "FullUriTemplateString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "FixedUriString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "ContentType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "MarkdownString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "SchemaString": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "ExampleSpec": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
                "strict": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "structuredValue": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "TypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "fixedFacets": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "structuredType": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "XMLFacetInfo": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "attribute": {
                    "name": string;
                };
                "wrapped": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "namespace": {
                    "name": string;
                };
                "prefix": {
                    "name": string;
                };
            };
        };
        "ArrayTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "uniqueItems": {
                    "name": string;
                };
                "items": {
                    "name": string;
                };
                "minItems": {
                    "name": string;
                };
                "maxItems": {
                    "name": string;
                };
                "structuredItems": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "UnionTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "ObjectTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "properties": {
                    "name": string;
                };
                "minProperties": {
                    "name": string;
                };
                "maxProperties": {
                    "name": string;
                };
                "additionalProperties": {
                    "name": string;
                };
                "discriminator": {
                    "name": string;
                };
                "discriminatorValue": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
            };
        };
        "StringTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "pattern": {
                    "name": string;
                };
                "minLength": {
                    "name": string;
                };
                "maxLength": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
            };
        };
        "BooleanTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
            };
        };
        "NumberTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "minimum": {
                    "name": string;
                };
                "maximum": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
                "format": {
                    "name": string;
                };
                "multipleOf": {
                    "name": string;
                };
            };
        };
        "IntegerTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "minimum": {
                    "name": string;
                };
                "maximum": {
                    "name": string;
                };
                "enum": {
                    "name": string;
                };
                "format": {
                    "name": string;
                };
                "multipleOf": {
                    "name": string;
                };
            };
        };
        "DateOnlyTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "TimeOnlyTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "DateTimeOnlyTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
            };
        };
        "DateTimeTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "format": {
                    "name": string;
                };
            };
        };
        "TypeInstance": {
            "name": string;
            "properties": {
                "properties": {
                    "name": string;
                };
                "isScalar": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
                "isArray": {
                    "name": string;
                };
                "items": {
                    "name": string;
                };
            };
        };
        "TypeInstanceProperty": {
            "name": string;
            "properties": {
                "name": {
                    "name": string;
                };
                "value": {
                    "name": string;
                };
                "values": {
                    "name": string;
                };
                "isArray": {
                    "name": string;
                };
            };
        };
        "ModelLocation": {
            "name": string;
            "properties": {};
        };
        "LocationKind": {
            "name": string;
            "properties": {};
        };
        "MimeType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "Response": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "code": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Annotable": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "AnnotationRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "annotation": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "AnnotationTarget": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "TraitRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "trait": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Trait": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "MethodBase": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
            };
        };
        "Method": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
                "body": {
                    "name": string;
                };
                "protocols": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "method": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "Operation": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
            };
        };
        "SecuritySchemePart": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "queryParameters": {
                    "name": string;
                };
                "headers": {
                    "name": string;
                };
                "queryString": {
                    "name": string;
                };
                "responses": {
                    "name": string;
                };
            };
        };
        "SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
            };
        };
        "OAuth1SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "requestTokenUri": {
                    "name": string;
                };
                "authorizationUri": {
                    "name": string;
                };
                "tokenCredentialsUri": {
                    "name": string;
                };
                "signatures": {
                    "name": string;
                };
            };
        };
        "OAuth2SecuritySchemeSettings": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "accessTokenUri": {
                    "name": string;
                };
                "authorizationUri": {
                    "name": string;
                };
                "authorizationGrants": {
                    "name": string;
                };
                "scopes": {
                    "name": string;
                };
            };
        };
        "SecuritySchemeRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "securitySchemeName": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
                "securityScheme": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "AbstractSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "OAuth2SecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "OAuth1SecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "PassThroughSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "BasicSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "DigestSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "CustomSecurityScheme": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "describedBy": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "settings": {
                    "name": string;
                };
            };
        };
        "ResourceTypeRef": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "resourceType": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ResourceType": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "methods": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "uriParameters": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "usage": {
                    "name": string;
                };
                "parametrizedProperties": {
                    "name": string;
                    "range": string;
                    "domain": string;
                };
            };
        };
        "ResourceBase": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "methods": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "uriParameters": {
                    "name": string;
                };
            };
        };
        "Resource": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "methods": {
                    "name": string;
                };
                "is": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "securedBy": {
                    "name": string;
                };
                "uriParameters": {
                    "name": string;
                };
                "relativeUri": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "resources": {
                    "name": string;
                };
            };
        };
        "FileTypeDeclaration": {
            "name": string;
            "properties": {
                "annotations": {
                    "name": string;
                };
                "name": {
                    "name": string;
                };
                "displayName": {
                    "name": string;
                };
                "facets": {
                    "name": string;
                };
                "schema": {
                    "name": string;
                };
                "type": {
                    "name": string;
                };
                "location": {
                    "name": string;
                };
                "locationKind": {
                    "name": string;
                };
                "default": {
                    "name": string;
                };
                "example": {
                    "name": string;
                };
                "examples": {
                    "name": string;
                };
                "required": {
                    "name": string;
                };
                "description": {
                    "name": string;
                };
                "xml": {
                    "name": string;
                };
                "allowedTargets": {
                    "name": string;
                };
                "isAnnotation": {
                    "name": string;
                };
                "fileTypes": {
                    "name": string;
                };
                "minLength": {
                    "name": string;
                };
                "maxLength": {
                    "name": string;
                };
            };
        };
    };
};
export interface UniverseProvider {
    (key: string): Universe;
    availableUniverses(): string[];
    clean(): any;
}
export declare var getUniverse: UniverseProvider;
