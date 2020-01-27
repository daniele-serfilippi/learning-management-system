import {
  Component,
  Input,
  ElementRef,
  DoCheck,
  OnDestroy,
  OnInit,
  HostBinding,
  forwardRef,
  Injector,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { NgControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import Quill from 'quill';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'quill-material',
  templateUrl: './quill-material.component.html',
  styleUrls: ['./quill-material.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillMaterialComponent),
      multi: true
    },
    {
      provide: MatFormFieldControl,
      useExisting: QuillMaterialComponent,
    },
  ],
})
export class QuillMaterialComponent implements
  OnInit,
  // OnChanges,
  DoCheck,
  OnDestroy,
  MatFormFieldControl<any>,
  // CanUpdateErrorState,
  ControlValueAccessor {

  static nextId = 0;

  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  // @Output() changed: EventEmitter<any> = new EventEmitter();

  // ------------------------------ ID
  @HostBinding() id = `quill-material-${QuillMaterialComponent.nextId++}`;

  // ------------------------------ CLASS
  @HostBinding('class.floating') get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  // public readonly shouldLabelFloat: boolean = true;

  // ------------------------------ PLACEHOLDER
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  _placeholder: string;

  // ------------------------------ REQUIRED
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  _required = false;

  // ------------------------------ ERROR STATE MATCHER
  // @Input()
  // public errorStateMatcher: ErrorStateMatcher;

  // ------------------------------ THEME
  @Input()
  public theme = 'snow';

  // ------------------------------ OPTIONS
  @Input()
  public options: any = null;

  // ------------------------------ VALUE
  // @Input() value: any;
  // get value(): any {
  //   console.log("get value: ", this._value)
  //   return this.editor.root.innerHTML;
  //   // return this._value;
  // }

  // set value(value: any) {
  //   console.log("set value: ", value)
  //   this._value = value;
  //   this.editor.setContents(this._value);
  //   this.onChange(value);
  //   this.stateChanges.next();
  // }

  // _value: any;

  // ------------------------------ DISABLED
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  _disabled = false;

  // ------------------------------ EMPTY
  get empty() {
    const commentText = this.editor.getText().trim();
    return commentText ? false : true;
  }

  // ------------------------------ FOCUSED
  get focused(): boolean {
    if (this.editor) {
      return this.editor.hasFocus();
    }
    return false;
  }

  errorState = false;
  stateChanges = new Subject<void>();
  quill: any = Quill;
  editor: any;
  controlType = 'quill-material';
  ngControl: any;
  touched = false;
  value: any;
  autofilled?: boolean;
  private defaultOptions = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
      ]
    }
  };
  // private defaultContents: any | undefined;

  // ------------------------------ CONSTRUCTOR
  constructor(
    private el: ElementRef,
    // private _defaultErrorStateMatcher: ErrorStateMatcher,
    // @Optional() private _parentForm: NgForm,
    // @Optional() private _parentFormGroup: FormGroupDirective,
    public injector: Injector
  ) { }

  ngOnInit(): void {
    const options = this.options || this.defaultOptions;

    if (typeof options.theme === 'undefined') {
      options.theme = this.theme;
    }
    const editor = this.el.nativeElement.querySelector('#editor');

    this.editor = new Quill(editor, options);

    // this.editor.on('editor-change', (eventName, ...args) => {
    //   console.log('ON editor-change', this.editor.getContents());
    //   this.changed.emit(this.editor.getContents());
    // });

    // ____________________________________________________________

    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.editor.on('text-change', () => {
      this.onChange(this.getValue());
    });

    this.el.nativeElement.querySelector('.ql-editor').addEventListener('blur', () => {
      this.onTouched();
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("LIFECYCLE ngOnChanges: ", changes)
  //   // if (typeof changes['value'] !== 'undefined' || typeof changes['required'] !== 'undefined') {
  //   //   this.stateChanges.next();
  //   // }
  //   if (this.editor) {
  //     this.editor.setContents(this.value);
  //   }
  // }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  onContainerClick(event: MouseEvent): void {
    if (!this.focused) {
      this.focus();
    }
  }

  focus(): void {
    if (this.editor) {
      this.editor.focus();
      this.stateChanges.next();
    }
  }

  // updateErrorState(): void {
  //   const oldState = this.errorState;
  //   const parent = this._parentFormGroup || this._parentForm;
  //   const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
  //   const control = this.ngControl ? this.ngControl.control as FormControl : null;
  //   const newState = matcher.isErrorState(control, parent);

  //   if (newState !== oldState) {
  //     this.errorState = newState;
  //     this.stateChanges.next();
  //   }
  // }

  setDescribedByIds(ids: Array<string>): void {
  }

  writeValue(contents: any): void {
    if (this.editor && contents) {
      this.editor.root.innerHTML = contents;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected getValue(): any | undefined {
    if (!this.editor) {
      return undefined;
    }

    const contents: any = this.editor.getContents();

    if (this.isEmpty(contents)) {
      return undefined;
    }

    return this.editor.root.innerHTML;
  }

  protected isEmpty(contents: any): boolean {
    if (contents.ops.length > 1) {
      return false;
    }

    const opsTypes: Array<string> = Object.keys(contents.ops[0]);

    if (opsTypes.length > 1) {
      return false;
    }

    if (opsTypes[0] !== 'insert') {
      return false;
    }

    if (contents.ops[0].insert !== '\n') {
      return false;
    }

    return true;
  }

  onTouched = () => {
    this.touched = true;
  }

  private onChange = (_: any) => { };

}
