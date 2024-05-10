//
//  Color.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/9/24.
//

import UIKit

enum Color: String {
    case gray50
    case gray100
    case gray200
    case gray300
    case gray400
    case gray500
    case gray600
    case gray700
    case gray800
    case gray900
    case myBlue
    case myRed
    case myPurple
    
    var color: UIColor {
        UIColor(named: self.rawValue) ?? .black
    }
}
