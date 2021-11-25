import { trigger, state, style, transition, animate, keyframes }
from '@angular/animations';

// trigger ===> ال كونتينر بتاع الانيمشن بتاعى
export const toggleFade = trigger('fade', [
    state('login', style({opacity: 1, backgroundColor: 'red'})),
    // =>  لما احط دىيبقى عايز ينفذ الانيمشن من الستات الاولى للستات التانية
    // <=> عايز ينفذ الانيمشن من الستات الاولى للستات التانية ومن التانية للاولى
    transition('login => logout', animate(500)),
    state('logout', style({opacity: 1, backgroundColor: 'green'}))
    /*
    state('*',style({opacity:0,backgroundColor:'green'}))
    * لو مش عارفة اسم الستات احط
    وبتسمى wild card state يعنى الديفلت الستات
    وال استايل اللى فيها بيطبق على الاليمنت ايا كان حالتة عاملة ازاى
    لازم تكون لوحدها ومش معاها استات تانية
    */
]);
export const toggleByVoid = trigger('toggle', [
     // void وانت نازل من الدوم وانت طالع من دوم هينفذ علية الانيمشن دة
    state('void', style({opacity: 0})),
    // يعنى من مفيش لديفلت استات
    transition('void <=> *', animate('2s 1s')),
     // animate(duration delay easing)
 ]);
export const toggleByEnterAndLeave = trigger('toggleBy', [
    //  enter ===> دى ستات اول لما يدخل الدوم
    // leave ===> دى ستات لما يخرج من الدوم
    state('void', style({opacity: 0, transform: 'translateX(30px)'})),
    transition(':enter,:leave', animate('2s 1s')),

 ]);
 // لو عايزة اعمل انيمشن معقد مش بيسمع على استات واحدة بيسمع على اكتر من ستات
export const multipleTransition = trigger('multiple', [
    // دى وانا داخل
    transition(':enter', [
                style({opacity: 0, transform: 'translateX(50px)'}),
                animate('500ms', style({opacity: 1, transform: 'translateX(0)'}))
                        ]),
    // دى وانا خارج
     transition(':leave', [
                style({opacity: 1}),
                animate('500ms', style({opacity: 0, transform: 'translateX(30px)'}))
                        ])
 ]);
export const toggleByKeyframe = trigger('ByKeyframe', [
    // دى وانا داخل
    transition(':enter', [
        style({opacity: 0, transform: 'translateX(50px)'}),
        animate('500ms', style({opacity: 1, transform: 'translateX(0)'}))
    ]),
    // دى وانا خارج
    transition(':leave', [
        animate('3s',
          keyframes([
            // offest ===> بتاخد من صفر لواحد وعايزة تقسمى الوقت دة
          style({backgroundColor: 'blue', offset: 0.7}),
          style({backgroundColor: 'green', offset: 0.9}),
          style({backgroundColor: 'red', offset: 1}),
        ]))
    ]),
 ]);

