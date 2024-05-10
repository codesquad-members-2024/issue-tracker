//
//  Issue.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/9/24.
//

import Foundation

struct Issue: Codable {
    let id: Int
    let title: String
    let comment: String
    let labels: [Label]?
    let milestone: Milestone?
}

extension Issue {
    
    struct Label: Codable {
        let id: Int
        let name: String
        let description: String
        let createdAt: String
        let color: String
    }
    
    struct Milestone: Codable {
        let id: Int
        let name: String
        let description: String
        let createdAt: String
        let deadline: String
    }
}
