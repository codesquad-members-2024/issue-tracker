//
//  IssueListController.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/9/24.
//

import UIKit

class IssueListController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    
    var issueViewModel = IssueViewModel()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "이슈"
        setupCollectionView()
        
        issueViewModel.fetchIssues {
            DispatchQueue.main.async {
                self.collectionView.reloadData()
            }
        }
    }
    
    private func setupCollectionView() {
        self.collectionView.register(
            UINib(nibName: "IssueCell", bundle: .main),
            forCellWithReuseIdentifier: IssueCell.identifier
        )
        
        self.collectionView.dataSource = self
        self.collectionView.delegate = self
    }
}

extension IssueListController: UICollectionViewDataSource, UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return issueViewModel.issues?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: IssueCell.identifier, for: indexPath) as? IssueCell else { return UICollectionViewCell() }
        
        if let issue = issueViewModel.issues?[indexPath.row] {
            let labels = issue.labels ?? nil
            cell.setData(labels)
            cell.setIssue(issue)
        }
        
        return cell
    }
}

extension IssueListController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let width = collectionView.bounds.width
        let height: CGFloat = 148
        return CGSize(width: width, height: height)
    }
}
