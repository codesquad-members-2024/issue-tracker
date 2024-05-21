//
//  IssueEditorViewController.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/16/24.
//

import UIKit

class IssueEditorViewController: UIViewController {

    static let identifier: String = "IssueEditorViewController"
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var optionInfoLabel: UILabel!
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.navigationItem.largeTitleDisplayMode = .never
        
        setupTableView()
        configureFont()
        configureNavigationBar()
    }
    
    private func setupTableView() {
        tableView.register(UINib(nibName: EditorOptionCell.identifier, bundle: .main), forCellReuseIdentifier: EditorOptionCell.identifier)
        tableView.dataSource = self
        tableView.delegate = self
    }
    
    private func configureFont() {
        self.titleLabel.applyStyle(fontManager: FontManager(weight: .medium, size: .large), textColor: .gray800)
        self.optionInfoLabel.applyStyle(fontManager: FontManager(weight: .semibold, size: .medium), textColor: .gray800)
    }

    private func configureNavigationBar() {
        let backButton = UIBarButtonItem(image: UIImage(systemName: "chevron.left"),
                                         style: .plain,
                                         target: self,
                                         action: #selector(backBtnTapped)
        )
        navigationItem.leftBarButtonItem = backButton
        
        let saveButton = UIBarButtonItem(title: "저장",
                                         style: .plain,
                                         target: self,
                                         action: #selector(saveBtnTapped)
        )
        navigationItem.rightBarButtonItem = saveButton
        
        let segmentedControl = UISegmentedControl(items: ["마크다운", "미리보기"])
        segmentedControl.selectedSegmentIndex = 0
        segmentedControl.addTarget(self, action: #selector(segmentChanged(_:)), for: .valueChanged)
        segmentedControl.frame = CGRect(origin: .zero, size: CGSize(width: 196.0, height: 32.0))
        
        let font = UIFont.systemFont(ofSize: 12, weight: .semibold)
        segmentedControl.setTitleTextAttributes([.font: font, .foregroundColor: UIColor.gray], for: .normal)
        segmentedControl.setTitleTextAttributes([.font: font, .foregroundColor: UIColor.black], for: .selected)
        
        navigationItem.titleView = segmentedControl
    }
    
    @objc private func backBtnTapped() {
        navigationController?.popViewController(animated: true)
    }
    
    @objc private func saveBtnTapped() {
        print("저장")
    }
    
    @objc private func segmentChanged(_ sender: UISegmentedControl) {
        switch sender.selectedSegmentIndex {
        case 0:
            print("마크다운 선택됨")
        case 1:
            print("미리보기 선택됨")
        default:
            break
        }
    }
}

extension IssueEditorViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: EditorOptionCell.identifier, for: indexPath) as? EditorOptionCell else {
            return UITableViewCell()
        }
        
        switch indexPath.row {
        case 0: cell.configureTitle(title: "담당자")
        case 1: cell.configureTitle(title: "레이블")
        case 2: cell.configureTitle(title: "마일스톤")
        default: return UITableViewCell()
        }
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 48
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let editorOptionVC = EditorOptionViewController(nibName: EditorOptionViewController.identifier, bundle: nil)
        
        switch indexPath.row {
        case 0: editorOptionVC.sectionTitle = "담당자"
        case 1: editorOptionVC.sectionTitle = "레이블"
        case 2: editorOptionVC.sectionTitle = "마일스톤"
        default: return
        }
        
        let navigationController = UINavigationController(rootViewController: editorOptionVC)
        present(navigationController, animated: true)
    }
}
