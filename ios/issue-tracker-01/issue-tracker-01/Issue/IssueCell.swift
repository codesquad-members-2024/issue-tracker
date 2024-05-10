//
//  IssueCell.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/9/24.
//

import UIKit

class IssueCell: UICollectionViewCell {

    static let identifier: String = "IssueCell"
    static let height: CGFloat = 148
    
    private var lables: [Issue.Label]?
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var milestoneLabel: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
//        configureLayout()
        configureFont()
        setupCollectionView()
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        
        titleLabel.text = nil
        descriptionLabel.text = nil
        milestoneLabel.text = nil
    }
    
    private func configureLayout() {
        contentView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            contentView.leadingAnchor.constraint(equalTo: leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: trailingAnchor)
        ])
        
        contentView.heightAnchor.constraint(equalToConstant: 148).isActive = true
    }
    
    private func setupCollectionView() {
        self.collectionView.register(
            UINib(nibName: "labelCell", bundle: .main),
            forCellWithReuseIdentifier: LabelCell.identifier
        )
        
        self.collectionView.dataSource = self
        self.collectionView.delegate = self
    }
    
    private func configureFont() {
        self.titleLabel.applyStyle(
            fontManager: FontManager(weight: .bold, size: .large),
            textColor: .gray900
        )
        self.descriptionLabel.applyStyle(
            fontManager: FontManager(weight: .regular, size: .medium),
            textColor: .gray800
        )
        self.milestoneLabel.applyStyle(
            fontManager: FontManager(weight: .regular, size: .medium),
            textColor: .gray800
        )
    }
    
    func setIssue(_ data: Issue) {
        self.titleLabel.text = data.title
        self.descriptionLabel.text = data.comment
        self.milestoneLabel.text = data.milestone?.name
    }
    
    func setData(_ data: [Issue.Label]?) {
        self.lables = data
        self.collectionView.reloadData()
    }
}

extension IssueCell: UICollectionViewDataSource, UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return lables?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: LabelCell.identifier, for: indexPath) as? LabelCell else {
            return UICollectionViewCell() }
        
        if let data = self.lables?[indexPath.item] {
            
            cell.setLabel(data)
        }
        
        return cell
    }
}
