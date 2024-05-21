//
//  NetworkManager.swift
//  issue-tracker-01
//
//  Created by 조호근 on 5/13/24.
//

import Foundation
import os

class NetworkManager {
    static let shared = NetworkManager()
    
    func fetchIssues(completion: @escaping ([Issue]?) -> Void) {
        HTTPManager.requestGET(url: URLDefines.issueList) { data in
            do {
                let issues = try JSONDecoder().decode([Issue].self, from: data)
                
                self.prettyPrintJSON(issues)
                
                DispatchQueue.main.async {
                    completion(issues)
                }
            } catch {
                os_log("[ fetchIssues ] : \(error)")
                DispatchQueue.main.async {
                    completion(nil)
                }
            }
        }
    }
    
    func fetchIssueDetail(issueId: Int, completion: @escaping (IssueDetail?) -> Void) {
        let url = URLDefines.issue + "/\(issueId)"
        
        HTTPManager.requestGET(url: url) { data in
            do {
                let issueDetail = try JSONDecoder().decode(IssueDetail.self, from: data)
                
                self.prettyPrintJSON(issueDetail)
                
                DispatchQueue.main.async {
                    completion(issueDetail)
                }
            } catch {
                os_log("[ fetchIssueDetail ] : \(error)")
                DispatchQueue.main.async {
                    completion(nil)
                }
            }
        }
    }
    
    func deleteIssue(issueId: Int, completion: @escaping (Bool) -> Void) {
        let url = URLDefines.issue + "/\(issueId)"
        
        HTTPManager.requestDELETE(url: url) { success in
            DispatchQueue.main.async {
                completion(success)
            }
        }
    }
    
    func closeIssue(issueId: Int, completion: @escaping (Bool) -> Void) {
        let url = URLDefines.issue + "/\(issueId)/close"
        
        HTTPManager.requestPOST(url: url) { success in
            DispatchQueue.main.async {
                completion(success)
            }
        }
    }
    
    private func prettyPrintJSON<T: Encodable>(_ item: T) {
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        do {
            let jsonData = try encoder.encode(item)
            if let jsonString = String(data: jsonData, encoding: .utf8) {
                print(jsonString)
            }
        } catch {
            os_log("[ prettyPrintJSON ] : \(error)")
        }
    }
}
