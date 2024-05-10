//
//  IssueViewModel.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/9/24.
//

import Foundation

class IssueViewModel {
    var issues: [Issue]?

    func fetchIssues(completion: @escaping () -> Void) {
        guard let url = URL(string: "http://3.36.70.238:8080/issue/list") else { return }
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                print("Error fetching data: \(error?.localizedDescription ?? "Unknown error")")
                return
            }

            do {
                self.issues = try JSONDecoder().decode([Issue].self, from: data)
                completion()
            } catch {
                print("Error decoding JSON: \(error)")
            }
        }.resume()
    }
}
