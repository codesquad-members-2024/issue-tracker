//
//  LabelCell.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/9/24.
//

import UIKit

class LabelCell: UICollectionViewCell {

    static let identifier: String = "labelCell"
    
    @IBOutlet weak var titleLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        configureFont()
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        
        self.titleLabel.text = nil
        self.titleLabel.backgroundColor = nil
    }

    private func configureFont() {
        self.titleLabel.applyStyle(fontManager: FontManager(weight: .bold, size: .medium), textColor: .gray50)
        self.titleLabel.backgroundColor = .brown
    }
    
    func setLabel(_ data: Issue.Label) {
        self.titleLabel.text = data.name
    }
}
