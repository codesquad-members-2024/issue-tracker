//
//  UILabel+Extensions.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/9/24.
//

import UIKit

extension UILabel {
    func applyStyle(fontManager: FontManager, textColor: Color) {
        self.font = fontManager.font
        self.textColor = textColor.color
    }
}
