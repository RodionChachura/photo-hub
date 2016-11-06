import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateAttachment][formControlName],[validateAttachment][formControl],[validateAttachment][ngModel]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => AttachmentValidator), multi: true }
  ]
})

export class AttachmentValidator implements Validator{
    public validate(c: FormControl) : { required: { [key: string]: boolean } | null } {
        let state: boolean;
    
        if(c.dirty && c.value && c.value.length == 0){
            state = true;
        }
        
        return state ? { required : { 'required' : false } } : null
    }
}