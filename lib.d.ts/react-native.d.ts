declare module "react-native" {
  export = __ReactNative
}

declare namespace __ReactNative {

      //
    // React Elements
    // ----------------------------------------------------------------------

    type ReactType = ComponentClass<any> | string;

    interface ReactElement<P> {
        type: string | ComponentClass<P>;
        props: P;
        key: string | number;
        ref: string | ((component: Component<P, any>) => any);
    }

    interface ClassicElement<P> extends ReactElement<P> {
        type: string | ClassicComponentClass<P>;
        ref: string | ((component: ClassicComponent<P, any>) => any);
    }

    interface DOMElement<P> extends ClassicElement<P> {
        type: string;
        ref: string | ((component: DOMComponent<P>) => any);
    }

    //
    // Factories
    // ----------------------------------------------------------------------

    interface Factory<P> {
        (props?: P, ...children: ReactNode[]): ReactElement<P>;
    }

    interface ClassicFactory<P> extends Factory<P> {
        (props?: P, ...children: ReactNode[]): ClassicElement<P>;
    }

    interface DOMFactory<P> extends ClassicFactory<P> {
        (props?: P, ...children: ReactNode[]): DOMElement<P>;
    }


    //
    // React Nodes
    // http://facebook.github.io/react/docs/glossary.html
    // ----------------------------------------------------------------------

    type ReactText = string | number;
    type ReactChild = ReactElement<any> | ReactText;

    // Should be Array<ReactNode> but type aliases cannot be recursive
    type ReactFragment = {} | Array<ReactChild | any[] | boolean>;
    type ReactNode = ReactChild | ReactFragment | boolean;

    //
    // Top Level API
    // ----------------------------------------------------------------------

    function createClass<P, S>(spec: ComponentSpec<P, S>): ClassicComponentClass<P>;

    function createFactory<P>(type: string): DOMFactory<P>;
    function createFactory<P>(type: ClassicComponentClass<P> | string): ClassicFactory<P>;
    function createFactory<P>(type: ComponentClass<P>): Factory<P>;

    function createElement<P>(
        type: string,
        props?: P,
        ...children: ReactNode[]): DOMElement<P>;
    function createElement<P>(
        type: ClassicComponentClass<P> | string,
        props?: P,
        ...children: ReactNode[]): ClassicElement<P>;
    function createElement<P>(
        type: ComponentClass<P>,
        props?: P,
        ...children: ReactNode[]): ReactElement<P>;

    function cloneElement<P>(
        element: DOMElement<P>,
        props?: P,
        ...children: ReactNode[]): DOMElement<P>;
    function cloneElement<P>(
        element: ClassicElement<P>,
        props?: P,
        ...children: ReactNode[]): ClassicElement<P>;
    function cloneElement<P>(
        element: ReactElement<P>,
        props?: P,
        ...children: ReactNode[]): ReactElement<P>;

    function render<P>(
        element: DOMElement<P>,
        container: Element,
        callback?: () => any): DOMComponent<P>;
    function render<P, S>(
        element: ClassicElement<P>,
        container: Element,
        callback?: () => any): ClassicComponent<P, S>;
    function render<P, S>(
        element: ReactElement<P>,
        container: Element,
        callback?: () => any): Component<P, S>;

    function unmountComponentAtNode(container: Element): boolean;
    function renderToString(element: ReactElement<any>): string;
    function renderToStaticMarkup(element: ReactElement<any>): string;
    function isValidElement(object: {}): boolean;
    function initializeTouchEvents(shouldUseTouch: boolean): void;

    function findDOMNode<TElement extends Element>(
        componentOrElement: Component<any, any> | Element): TElement;
    function findDOMNode(
        componentOrElement: Component<any, any> | Element): Element;

    var PropTypes: ReactPropTypes;
    var Children: ReactChildren;

    //
    // Component API
    // ----------------------------------------------------------------------

    // Base component for plain JS classes
    class Component<P, S> implements ComponentLifecycle<P, S> {
        constructor(props?: P, context?: any);
        setState(f: (prevState: S, props: P) => S, callback?: () => any): void;
        setState(state: S, callback?: () => any): void;
        forceUpdate(callBack?: () => any): void;
        render(): JSX.Element;
        props: P;
        state: S;
        context: {};
        refs: {
            [key: string]: Component<any, any>
        };
    }

    interface ClassicComponent<P, S> extends Component<P, S> {
        replaceState(nextState: S, callback?: () => any): void;
        getDOMNode<TElement extends Element>(): TElement;
        getDOMNode(): Element;
        isMounted(): boolean;
        getInitialState?(): S;
        setProps(nextProps: P, callback?: () => any): void;
        replaceProps(nextProps: P, callback?: () => any): void;
    }

    interface DOMComponent<P> extends ClassicComponent<P, any> {
        tagName: string;
    }

    interface ChildContextProvider<CC> {
        getChildContext(): CC;
    }

    //
    // Class Interfaces
    // ----------------------------------------------------------------------

    interface ComponentClass<P> {
        new(props?: P, context?: any): Component<P, any>;
        propTypes?: ValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        childContextTypes?: ValidationMap<any>;
        defaultProps?: P;
    }

    interface ClassicComponentClass<P> extends ComponentClass<P> {
        new(props?: P, context?: any): ClassicComponent<P, any>;
        getDefaultProps?(): P;
        displayName?: string;
    }

    //
    // Component Specs and Lifecycle
    // ----------------------------------------------------------------------

    interface ComponentLifecycle<P, S> {
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillReceiveProps?(nextProps: P, nextContext: any): void;
        shouldComponentUpdate?(nextProps: P, nextState: S, nextContext: any): boolean;
        componentWillUpdate?(nextProps: P, nextState: S, nextContext: any): void;
        componentDidUpdate?(prevProps: P, prevState: S, prevContext: any): void;
        componentWillUnmount?(): void;
    }

    interface Mixin<P, S> extends ComponentLifecycle<P, S> {
        mixins?: Mixin<P, S>;
        statics?: {
            [key: string]: any;
        };

        displayName?: string;
        propTypes?: ValidationMap<any>;
        contextTypes?: ValidationMap<any>;
        childContextTypes?: ValidationMap<any>

        getDefaultProps?(): P;
        getInitialState?(): S;
    }

    interface ComponentSpec<P, S> extends Mixin<P, S> {
        render(): ReactElement<any>;

        [propertyName: string]: any;
    }



    //
    // Event Handler Types
    // ----------------------------------------------------------------------

    interface EventHandler<E extends SyntheticEvent<void>> {
        (event: E): void;
    }

    //
    // Props / DOM Attributes
    // ----------------------------------------------------------------------

    interface Props<T> {
        children?: ReactNode;
        key?: string | number;
        ref?: string | ((component: T) => any);
    }



    // This interface is not complete. Only properties accepting
    // unitless numbers are listed here (see CSSProperty.js in React)
    interface CSSProperties {
        boxFlex?: number;
        boxFlexGroup?: number;
        columnCount?: number;
        flex?: number | string;
        flexGrow?: number;
        flexShrink?: number;
        fontWeight?: number | string;
        lineClamp?: number;
        lineHeight?: number | string;
        opacity?: number;
        order?: number;
        orphans?: number;
        widows?: number;
        zIndex?: number;
        zoom?: number;

        fontSize?: number | string;

        // SVG-related properties
        fillOpacity?: number;
        strokeOpacity?: number;
        strokeWidth?: number;

        [propertyName: string]: any;
    }




    //
    // React.PropTypes
    // ----------------------------------------------------------------------

    interface Validator<T> {
        (object: T, key: string, componentName: string): Error;
    }

    interface Requireable<T> extends Validator<T> {
        isRequired: Validator<T>;
    }

    interface ValidationMap<T> {
        [key: string]: Validator<T>;
    }

    interface ReactPropTypes {
        any: Requireable<any>;
        array: Requireable<any>;
        bool: Requireable<any>;
        func: Requireable<any>;
        number: Requireable<any>;
        object: Requireable<any>;
        string: Requireable<any>;
        node: Requireable<any>;
        element: Requireable<any>;
        instanceOf(expectedClass: {}): Requireable<any>;
        oneOf(types: any[]): Requireable<any>;
        oneOfType(types: Validator<any>[]): Requireable<any>;
        arrayOf(type: Validator<any>): Requireable<any>;
        objectOf(type: Validator<any>): Requireable<any>;
        shape(type: ValidationMap<any>): Requireable<any>;
    }

    //
    // React.Children
    // ----------------------------------------------------------------------

    interface ReactChildren {
        map<T>(children: ReactNode, fn: (child: ReactChild, index: number) => T): { [key:string]: T };
        forEach(children: ReactNode, fn: (child: ReactChild, index: number) => any): void;
        count(children: ReactNode): number;
        only(children: ReactNode): ReactChild;
    }

    //
    // Browser Interfaces
    // https://github.com/nikeee/2048-typescript/blob/master/2048/js/touch.d.ts
    // ----------------------------------------------------------------------

    interface AbstractView {
        styleMedia: StyleMedia;
        document: Document;
    }

    interface Touch {
        identifier: number;
        target: EventTarget;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
    }

    interface TouchList {
        [index: number]: Touch;
        length: number;
        item(index: number): Touch;
        identifiedTouch(identifier: number): Touch;
    }

  /**
   * Represents the completion of an asynchronous operation
   * @see lib.es6.d.ts
   */
  export interface Promise<T> {
      /**
      * Attaches callbacks for the resolution and/or rejection of the Promise.
      * @param onfulfilled The callback to execute when the Promise is resolved.
      * @param onrejected The callback to execute when the Promise is rejected.
      * @returns A Promise for the completion of which ever callback is executed.
      */
      then<TResult>(onfulfilled?: (value: T) => TResult | Promise<TResult>, onrejected?: (reason: any) => TResult | Promise<TResult>): Promise<TResult>;

      /**
       * Attaches a callback for only the rejection of the Promise.
       * @param onrejected The callback to execute when the Promise is rejected.
       * @returns A Promise for the completion of the callback.
       */
      catch(onrejected?: (reason: any) => T | Promise<T>): Promise<T>;


      // not in lib.es6.d.ts but called by react-native
      done(): void;
  }

  export interface PromiseConstructor {
      /**
        * A reference to the prototype.
        */
      prototype: Promise<any>;

      /**
       * Creates a new Promise.
       * @param init A callback used to initialize the promise. This callback is passed two arguments:
       * a resolve callback used resolve the promise with a value or the result of another promise,
       * and a reject callback used to reject the promise with a provided reason or error.
       */
      new <T>(init: (resolve: (value?: T | Promise<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

      <T>(init: (resolve: (value?: T | Promise<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

      /**
       * Creates a Promise that is resolved with an array of results when all of the provided Promises
       * resolve, or rejected when any Promise is rejected.
       * @param values An array of Promises.
       * @returns A new Promise.
       */
      all<T>(values: (T | Promise<T>)[]): Promise<T[]>;

      /**
       * Creates a Promise that is resolved with an array of results when all of the provided Promises
       * resolve, or rejected when any Promise is rejected.
       * @param values An array of values.
       * @returns A new Promise.
       */
      all(values: Promise<void>[]): Promise<void>;

      /**
       * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
       * or rejected.
       * @param values An array of Promises.
       * @returns A new Promise.
       */
      race<T>(values: (T | Promise<T>)[]): Promise<T>;

      /**
       * Creates a new rejected promise for the provided reason.
       * @param reason The reason the promise was rejected.
       * @returns A new rejected Promise.
       */
      reject(reason: any): Promise<void>;

      /**
       * Creates a new rejected promise for the provided reason.
       * @param reason The reason the promise was rejected.
       * @returns A new rejected Promise.
       */
      reject<T>(reason: any): Promise<T>;

      /**
        * Creates a new resolved promise for the provided value.
        * @param value A promise.
        * @returns A promise whose internal state matches the provided promise.
        */
      resolve<T>(value: T | Promise<T>): Promise<T>;

      /**
       * Creates a new resolved promise .
       * @returns A resolved promise.
       */
      resolve(): Promise<void>;
  }

  // @see lib.es6.d.ts
  export var Promise: PromiseConstructor;

  // node_modules/react-tools/src/classic/class/ReactClass.js
  export interface ReactClass<D, P, S>
  {
    // TODO:
  }

  // see react-jsx.d.ts
  export function createElement<P>(
    type: ReactType,
    props?: P,
    ...children: ReactNode[]): ReactElement<P>;


  export type Runnable = (appParameters:any) => void;

  export type AppConfig = {
    appKey: string;
    component: ReactClass<any, any, any>;
    run?: Runnable;
  }

  // https://github.com/facebook/react-native/blob/master/Libraries/AppRegistry/AppRegistry.js
  export class AppRegistry
  {
    static registerConfig(config: AppConfig[]): void;
    static registerComponent(appKey: string, getComponentFunc: () => ComponentClass<any>): string;
    static registerRunnable(appKey: string, func: Runnable): string;
    static runApplication(appKey: string, appParameters: any): void;
  }

  /*
  export interface ReactPropTypes extends React.ReactPropTypes
  {

  }

  export interface PropTypes
  {
    [key:string]: React.Requireable<any>;
  }
*/


  export interface StyleSheetProperties
  {
    // TODO:
  }

  export interface LayoutRectangle
  {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  // @see TextProperties.onLayout
  export interface LayoutChangeEvent
  {
    nativeEvent: {
      layout: LayoutRectangle
    }
  }

  // @see https://facebook.github.io/react-native/docs/text.html#style
  export interface TextStyle
  {
    color?: string;
    containerBackgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string; // 'normal' | 'italic';
    fontWeight?: string; // enum("normal", 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: string; // enum("auto", 'left', 'right', 'center')
    writingDirection?: string; //enum("auto", 'ltr', 'rtl')
  }

  // https://facebook.github.io/react-native/docs/text.html#props
  export interface TextProperties
  {
    /**
     * numberOfLines number
     *
     * Used to truncate the text with an elipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.
     */
    numberOfLines?: number;

    /**
     * onLayout function
     *
     * Invoked on mount and layout changes with
     *
     * {nativeEvent: { layout: {x, y, width, height}}}.
     */
     onLayout?: (event: LayoutChangeEvent) => void;

     /**
      * onPress function
      *
      * This function is called on press. Text intrinsically supports press handling with a default highlight state (which can be disabled with suppressHighlighting).
      */
     onPress?: () => void;

     /**
      * @see https://facebook.github.io/react-native/docs/text.html#style
      */
      style?: TextStyle;
  }

  export interface AccessibilityTraits
  {
    // TODO
  }

  // @see https://facebook.github.io/react-native/docs/view.html#style
  export interface ViewStyle
  {
    backgroundColor?: string;
    borderBottomColor?: string;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderColor?: string;
    borderLeftColor?: string;
    borderRadius?: number;
    borderRightColor?: string;
    borderTopColor?: string;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    opacity?: number;
    overflow?: string; // enum('visible', 'hidden')
    shadowColor?: string;
    shadowOffset?: {width: number, height: number};
    shadowOpacity?: number;
    shadowRadius?: number;
  }

  /**
   * @see https://facebook.github.io/react-native/docs/view.html#props
   */
  export interface ViewProperties
  {
    /**
     * accessibilityLabel string
     *
     * Overrides the text that's read by the screen reader when the user interacts with the element. By default, the label is constructed by traversing all the children and accumulating all the Text nodes separated by space.
     *
     */

     accessibilityLabel?: string;


     /**
      * accessibilityTraits AccessibilityTraits, [AccessibilityTraits]
      * Provides additional traits to screen reader. By default no traits are provided unless specified otherwise in element
      */

    accessibilityTraits?: AccessibilityTraits;

    /**
     * accessible bool
     *
     * When true, indicates that the view is an accessibility element. By default, all the touchable elements are accessible.
     */

    accessible?: boolean;

    /**
     * onAcccessibilityTap function
     * When accessible is true, the system will try to invoke this function when the user performs accessibility tap gesture.
     *
     */

    onAcccessibilityTap?: () => void;

    /**
     * onLayout function
     *
     * Invoked on mount and layout changes with
     *
     * {nativeEvent: { layout: {x, y, width, height}}}.
     */
     onLayout?: (event: LayoutChangeEvent) => void;

    /**
     * onMagicTap function
     *
     * When accessible is true, the system will invoke this function when the user performs the magic tap gesture.
     */

    onMagicTap?: () => void;

    /**
     * onMoveShouldSetResponder function
     *
     * For most touch interactions, you'll simply want to wrap your component in TouchableHighlight or TouchableOpacity. Check out Touchable.js, ScrollResponder.js and ResponderEventPlugin.js for more discussion.
     */
    onMoveShouldSetResponder?: () => void;

    onResponderGrant?: () => void;

    onResponderMove?: () => void;

    onResponderReject?: () => void;

    onResponderRelease?: () => void;

    onResponderTerminate?: () => void;

    onResponderTerminationRequest?: () => void;

    onStartShouldSetResponder?: () => void;

    onStartShouldSetResponderCapture?: () => void;

    /**
     * pointerEvents enum('box-none', 'none', 'box-only', 'auto')
     *
     * In the absence of auto property, none is much like CSS's none value. box-none is as if you had applied the CSS class:
     *
     * .box-none {
     *   pointer-events: none;
     * }
     * .box-none * {
     *   pointer-events: all;
     * }
     *
     * box-only is the equivalent of
     *
     * .box-only {
     *   pointer-events: all;
     * }
     * .box-only * {
     *   pointer-events: none;
     * }
     *
     * But since pointerEvents does not affect layout/appearance, and we are already deviating from the spec by adding additional modes,
     * we opt to not include pointerEvents on style. On some platforms, we would need to implement it as a className anyways. Using style or not is an implementation detail of the platform.
     */

    pointerEvents?: string;

    /**
     * removeClippedSubviews bool
     *
     * This is a special performance property exposed by RCTView and is useful for scrolling content when there are many subviews,
     * most of which are offscreen. For this property to be effective, it must be applied to a view that contains many subviews that extend outside its bound.
     * The subviews must also have overflow: hidden, as should the containing view (or one of its superviews).
     */

     removeClippedSubviews?: boolean

    /**
     * renderToHardwareTextureAndroid bool
     *
     * Whether this view should render itself (and all of its children) into a single hardware texture on the GPU.
     *
     * On Android, this is useful for animations and interactions that only modify opacity, rotation, translation, and/or scale:
     * in those cases, the view doesn't have to be redrawn and display lists don't need to be re-executed. The texture can just be
     * re-used and re-composited with different parameters. The downside is that this can use up limited video memory, so this prop should be set back to false at the end of the interaction/animation.
     */

     renderToHardwareTextureAndroid?: boolean;

     style?: ViewStyle;

     /**
      * testID string
      *
      * Used to locate this view in end-to-end tests.
      */

    testID?: string;
  }

  /**
   * @see https://facebook.github.io/react-native/docs/activityindicatorios.html#props
   */
  export interface AlertIOSProperties
  {
    /**
     * animating bool
     *
     * Whether to show the indicator (true, the default) or hide it (false).
     */
    animating?: boolean;

    /**
     * color string
     *
     * The foreground color of the spinner (default is gray).
     */

    color?: string;

    /**
     * hidesWhenStopped bool
     *
     * Whether the indicator should hide when not animating (true by default).
     */

    hidesWhenStopped?: boolean;

    /**
     * onLayout function
     *
     * Invoked on mount and layout changes with
     *
     * {nativeEvent: { layout: {x, y, width, height}}}.
     */
     onLayout?: (event: LayoutChangeEvent) => void;

    /**
     * size enum('small', 'large')
     *
     * Size of the indicator. Small has a height of 20, large has a height of 36.
     */
    size: string; // enum('small', 'large')
  }

  /**
   * @see
   */
  export interface SegmentedControlIOSProperties
  {
    /// TODO
  }

  /**
   * @see
   */
  export interface SwitchIOSProperties
  {
    /// TODO
  }

  /**
   * @see
   */
  export interface NavigatorProperties
  {
    /// TODO
  }

  /**
   * @see
   */
  export interface ActivityIndicatorIOSProperties
  {
    /// TODO
  }

  /**
   * @see https://facebook.github.io/react-native/docs/sliderios.html
   */
  export interface SliderIOSProperties
  {
    /**
    maximumTrackTintColor string
    The color used for the track to the right of the button. Overrides the default blue gradient image.
    */
    maximumTrackTintColor?: string;

    /**
    maximumValue number

    Initial maximum value of the slider. Default value is 1.
    */
    maximumValue?: number;

    /**
    minimumTrackTintColor string
    The color used for the track to the left of the button. Overrides the default blue gradient image.
    */
    minimumTrackTintColor?: string;

    /**
    minimumValue number
    Initial minimum value of the slider. Default value is 0.
    */
    minimumValue?: number;

    /**
    onSlidingComplete function
    Callback called when the user finishes changing the value (e.g. when the slider is released).
    */
    onSlidingComplete?: () => void;

    /**
    onValueChange function
    Callback continuously called while the user is dragging the slider.
    */
    onValueChange?: (value: number) => void;

    /**
    value number
    Initial value of the slider. The value should be between minimumValue and maximumValue, which default to 0 and 1 respectively. Default value is 0.

    This is not a controlled component, e.g. if you don't update the value, the component won't be reset to its inital value.
    */
    value?: number;
  }

  /**
   * @see
   */
  export interface CameraRollProperties
  {
    /// TODO
  }

  /**
   * @see
   */
  export interface ImageProperties
  {
    /// TODO
  }

  /**
   * @see
   */
  export interface ListViewProperties
  {
    /// TODO
  }

  /**
   * @see https://facebook.github.io/react-native/docs/touchablehighlight.html#props
   */
  export interface TouchableHighlightProperties
  {
    /**
     * activeOpacity number
     *
     * Determines what the opacity of the wrapped view should be when touch is active.
     */
    activeOpacity?: number;

    /**
     * onHideUnderlay function
     *
     * Called immediately after the underlay is hidden
     */

    onHideUnderlay?: () => void;


    /**
     * onShowUnderlay function
     *
     * Called immediately after the underlay is shown
     */

    /**
     * @see https://facebook.github.io/react-native/docs/view.html#style
     */
    style?: ViewStyle;


    /**
     * underlayColor string
     *
     * The color of the underlay that will show through when the touch is active.
     */
    underlayColor?: string;

  }

  /**
   * @see https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html
   */
  export interface TouchableWithoutFeedbackProperties
  {
    /*
      accessible bool

      Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock).
   */
   accessible?: boolean;
   /*
      delayLongPress number

      Delay in ms, from onPressIn, before onLongPress is called.
   */
   delayLongPress?: number;

   /*
      delayPressIn number

      Delay in ms, from the start of the touch, before onPressIn is called.
   */
   delayPressIn?: number;

   /*
      delayPressOut number

      Delay in ms, from the release of the touch, before onPressOut is called.
   */
   delayPressOut?: number;

   /*
      onLongPress function
   */
   onLongPress?: () => void;

   /*
      onPress function
   */
   onPress?: () => void;

   /*
      onPressIn function
   */
   onPressIn?: () => void;

   /*
      onPressOut function
   */
   onPressOut?: () => void;
  }


  /**
   * @see https://facebook.github.io/react-native/docs/touchableopacity.html#props
   */
  export interface TouchableOpacityProperties
  {
    /**
     * activeOpacity number
     *
     * Determines what the opacity of the wrapped view should be when touch is active.
     */
    activeOpacity?: number;
  }


  export interface LeftToRightGesture
  {

  }

  export interface AnimationInterpolator
  {

  }

  // see /NavigatorSceneConfigs.js
  export interface SceneConfig
  {
    // A list of all gestures that are enabled on this scene
    gestures: {
      pop: LeftToRightGesture,
    },

    // Rebound spring parameters when transitioning FROM this scene
    springFriction: number;
    springTension: number;

    // Velocity to start at when transitioning without gesture
    defaultTransitionVelocity: number;

    // Animation interpolators for horizontal transitioning:
    animationInterpolators: {
      into: AnimationInterpolator,
      out: AnimationInterpolator
    };

  }

  // see /NavigatorSceneConfigs.js
  export interface SceneConfigs
  {
    FloatFromBottom: SceneConfig;
    FloatFromRight: SceneConfig;
    PushFromRight: SceneConfig;
    FloatFromLeft: SceneConfig;
    HorizontalSwipeJump: SceneConfig;
  }

  export interface Route {
      id: string;
      title?: string;
  }

  /**
   * @see
   */
  export interface NavigatorBarProperties
  {

  }

  export interface NavigationBar extends ComponentClass<NavigatorBarProperties>
  {

  }

  export interface NavigatorStatic extends ComponentClass<NavigatorProperties>
  {
    SceneConfigs: SceneConfigs;
    getContext(self:any): NavigatorStatic;

    push(route: Route): void;
    pop(): void;
    popToTop(): void;
    popToRoute( route: Route ): void;
    immediatelyResetRouteStack( routes: Route[] ): void;
    getCurrentRoutes(): Route[];

    NavigationBar: NavigationBar;
  }

  export interface StyleSheetStatic extends ComponentClass<StyleSheetProperties>
  {
    create<T>(styles:T): T;
  }

  export interface DataSourceAssetCallback
  {
    rowHasChanged: (r1: any[], r2: any[]) => boolean;
  }

  export interface ListViewDataSource
  {
    new(onAsset: DataSourceAssetCallback): ListViewDataSource;
    cloneWithRows<T>(rowList:T[][]): void;
  }

  export interface ListViewStatic extends ComponentClass<ListViewProperties>
  {
    DataSource: ListViewDataSource;
  }

  export interface ImageStatic extends ComponentClass<ImageProperties>
  {
    uri: string;
  }

  /**
   * @see
   */
  export interface TabBarItemProperties
  {

  }

  export interface TabBarItem extends ComponentClass<TabBarItemProperties>
  {
  }

  /**
   * @see
   */
  export interface TabBarIOSProperties
  {
  }

  export interface TabBarIOSStatic extends ComponentClass<TabBarIOSProperties>
  {
    Item: TabBarItem;
  }

  export interface CameraRollFetchParams
  {
      first: number;
      groupTypes: string;
      after?: string;
  }

  export interface CameraRollNodeInfo
  {
    image: Image;
    group_name: string;
    timestamp: number;
    location: any;
  }

  export interface CameraRollEdgeInfo
  {
    node: CameraRollNodeInfo;
  }

  export interface CameraRollAssetInfo
  {
    edges: CameraRollEdgeInfo[];
    page_info: {
      has_next_page: boolean;
      end_cursor: string;
    };
  }

  export interface CameraRollStatic extends ComponentClass<CameraRollProperties>
  {
    getPhotos(fetch: CameraRollFetchParams,
              onAsset: (assetInfo: CameraRollAssetInfo) => void,
              logError: ()=> void): void;
  }

  export interface PanHandlers
  {

  }

  export interface PanResponderEvent
  {

  }

  export interface PanResponderGestureState
  {
    stateID: number;
    moveX: number;
    moveY: number;
    x0: number;
    y0: number;
    dx: number;
    dy: number;
    vx: number;
    vy: number;
    numberActiveTouches: number;
    // All `gestureState` accounts for timeStamps up until:
    _accountsForMovesUpTo: number;
  }

  /**
   * @param {object} config Enhanced versions of all of the responder callbacks
   * that provide not only the typical `ResponderSyntheticEvent`, but also the
   * `PanResponder` gesture state.  Simply replace the word `Responder` with
   * `PanResponder` in each of the typical `onResponder*` callbacks. For
   * example, the `config` object would look like:
   *
   *  - `onMoveShouldSetPanResponder: (e, gestureState) => {...}`
   *  - `onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}`
   *  - `onStartShouldSetPanResponder: (e, gestureState) => {...}`
   *  - `onStartShouldSetPanResponderCapture: (e, gestureState) => {...}`
   *  - `onPanResponderReject: (e, gestureState) => {...}`
   *  - `onPanResponderGrant: (e, gestureState) => {...}`
   *  - `onPanResponderStart: (e, gestureState) => {...}`
   *  - `onPanResponderEnd: (e, gestureState) => {...}`
   *  - `onPanResponderRelease: (e, gestureState) => {...}`
   *  - `onPanResponderMove: (e, gestureState) => {...}`
   *  - `onPanResponderTerminate: (e, gestureState) => {...}`
   *  - `onPanResponderTerminationRequest: (e, gestureState) => {...}`
   *
   *  In general, for events that have capture equivalents, we update the
   *  gestureState once in the capture phase and can use it in the bubble phase
   *  as well.
   *
   *  Be careful with onStartShould* callbacks. They only reflect updated
   *  `gestureState` for start/end events that bubble/capture to the Node.
   *  Once the node is the responder, you can rely on every start/end event
   *  being processed by the gesture and `gestureState` being updated
   *  accordingly. (numberActiveTouches) may not be totally accurate unless you
   *  are the responder.
   */
  export interface PanResponderCallbacks
  {
    onMoveShouldSetPanResponder?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onStartShouldSetPanResponder?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderGrant?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderMove?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderRelease?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderTerminate?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;

    onMoveShouldSetPanResponderCapture?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onStartShouldSetPanResponderCapture?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onPanResponderReject?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderStart?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderEnd?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderTerminationRequest?: (e: PanResponderEvent, gestureState: PanResponderGestureState) => void;
  }

  export interface PanResponderInstance
  {
    panHandlers: PanHandlers;
  }

  export interface PanResponderStatic
  {
    create(callbacks: PanResponderCallbacks): PanResponderInstance;
  }

  export interface PixelRatioStatic
  {
    get(): number;
  }

  export interface DeviceEventSubscriptionStatic
  {
    remove(): void;
  }

  export interface DeviceEventEmitterStatic
  {
    addListener<T>(type:string, onReceived: (data:T) => void): DeviceEventSubscription;
  }

  // Used by Dimensions below
  export interface ScaledSize
  {
    width: number;
    height: number;
    scale: number;
  }

  // @see https://facebook.github.io/react-native/docs/asyncstorage.html#content
  export interface AsyncStorageStatic
  {
       getItem(key: string, callback?: (error?: Error, result?: string) => void): Promise<string>;
       setItem(key: string, value: string, callback?: (error?: Error) => void): Promise<string>;
       removeItem(key: string, callback?: (error?: Error) => void): Promise<string>;
       mergeItem(key: string, value: string, callback?: (error?: Error) => void): Promise<string>;
       clear(callback?: (error?: Error) => void): Promise<string>;
       getAllKeys(callback?: (error?: Error, keys?: string[]) => void): Promise<string>;
       multiGet(keys: string[], callback?: (errors?: Error[], result?: string[][]) => void): Promise<string>;
       multiSet(keyValuePairs: string[][], callback?: (errors?: Error[]) => void): Promise<string>;
       multiRemove(keys: string[], callback?: (errors?: Error[]) => void): Promise<string>;
       multiMerge(keyValuePairs: string[][], callback?: (errors?: Error[]) => void): Promise<string>;
  }

  export interface InteractionManagerStatic
  {
    runAfterInteractions( fn: () => void ): void;
  }

  export interface ScrollViewProperties
  {

  }

  export interface SyntheticEvent<T>
  {
    nativeEvent: T;
  }

  export interface NativeScrollRectangle
  {
    left: number;
    top: number;
    bottom: number;
    right: number;
  }

  export interface NativeScrollPoint
  {
    x: number;
    y: number;
  }

  export interface NativeScrollSize
  {
    height: number;
    width: number;
  }

  export interface NativeScrollEvent
  {
    contentInset: NativeScrollRectangle;
    contentOffset: NativeScrollPoint;
    contentSize: NativeScrollSize;
    layoutMeasurement: NativeScrollSize;
    zoomScale: number;
  }

  export interface AppStateIOSStatic
  {
    currentState: string;
    addEventListener( type: string, listener: (state: string) => void ): void;
    removeEventListener( type: string, listener: (state: string) => void ): void;
  }

  // exported singletons:
  // export var AppRegistry: AppRegistryStatic;
  export var StyleSheet: StyleSheetStatic;
  export var Navigator: NavigatorStatic;
  export type Navigator = NavigatorStatic;
  export var ListView: ListViewStatic;
  export var CameraRoll: CameraRollStatic;
  export var Image: ImageStatic;
  export type Image = ImageStatic;
  export var TabBarIOS: TabBarIOSStatic;
  export type TabBarIOS = TabBarIOSStatic;
  export var AsyncStorage: AsyncStorageStatic;

  export var Text: ComponentClass<TextProperties>;
  export var View: ComponentClass<ViewProperties>;
  export var AlertIOS: ComponentClass<AlertIOSProperties>;
  export var SegmentedControlIOS: ComponentClass<SegmentedControlIOSProperties>;
  export var SwitchIOS: ComponentClass<SwitchIOSProperties>;
  export var TouchableHighlight: ComponentClass<TouchableHighlightProperties>;
  export var TouchableOpacity: ComponentClass<TouchableOpacityProperties>;
  export var TouchableWithoutFeedback: ComponentClass<TouchableWithoutFeedbackProperties>;


  export var ActivityIndicatorIOS: ComponentClass<ActivityIndicatorIOSProperties>;
  export var PixelRatio: PixelRatioStatic;
  export var DeviceEventEmitter: DeviceEventEmitterStatic;
  export var DeviceEventSubscription: DeviceEventSubscriptionStatic;
  export type DeviceEventSubscription = DeviceEventSubscriptionStatic;
  export var InteractionManager: InteractionManagerStatic;
  export var ScrollView: ComponentClass<ScrollViewProperties>;
  export var PanResponder: PanResponderStatic;
  export var SliderIOS: ComponentClass<SliderIOSProperties>;
  export var AppStateIOS: AppStateIOSStatic;

  // export type SyntheticEvent<T> = SyntheticEventStatic<T>;

  /*
  export var PropTypes: PropTypesStatic;
  export type PropTypes = PropTypesStatic;
  export var ReactPropTypes: ReactPropTypesStatic;
  export type ReactPropTypes = ReactPropTypesStatic;
  */

  /*

  React.__spread({
            style: styles.thumbContainer,
            onLayout: this._onLayout }, this._panResponder.panHandlers),

  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   __spread: Object.assign,

  */

  export function __spread(target:any, ...sources:any[]): any;
}

declare module "Dimensions"
{
  import { ScaledSize } from 'react-native';

  interface Dimensions
  {
    get(what:string): ScaledSize;
  }

  var ExportDimensions: Dimensions;
  export = ExportDimensions;
}



declare namespace JSX {
    import React = __ReactNative;

    interface Element extends React.ReactElement<any> { }
    interface ElementClass extends React.Component<any, any> {
        render(): JSX.Element;
    }
    interface ElementAttributesProperty { props: {}; }

    interface IntrinsicElements {

    }
}
