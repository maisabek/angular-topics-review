import {trigger, transition, style, animate, query, animateChild}
           from '@angular/animations';

export const popUp = [trigger('popupParent', [
transition(':enter', [style({opacity: 0}),
                     animate('150ms', style({opacity: 0})),
                     query('@popupChild', [animateChild()])
]),
transition(':leave', [style({opacity: 1}),
    animate('150ms', style({opacity: 0})),
    query('@popupChild', [animateChild()])
])
]),
// child
trigger('popupChild', [
    transition(':enter', [style({opacity: 0, transform: 'translateX(20px)'}),
            animate('500ms', style({opacity: 0, transform: 'translateX(0)'}))
    ]),
    transition(':leave', [style({opacity: 1}),
        animate('500ms', style({opacity: 0, transform: 'translateY(30px)'}))
    ])
])
];
