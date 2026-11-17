import UIKit
import Capacitor

final class ParallaxViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        super.capacitorDidLoad()
        let space = UIColor(red: 2.0 / 255.0, green: 4.0 / 255.0, blue: 10.0 / 255.0, alpha: 1)
        view.backgroundColor = space
        webView?.backgroundColor = space
        webView?.isOpaque = false
        webView?.scrollView.bounces = false
        webView?.scrollView.contentInsetAdjustmentBehavior = .never
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        .lightContent
    }
}
