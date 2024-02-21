-- Open Script Editor -> Insert Code
-- Open Automator -> Find Run AppleScript -> File -> Convert To... -> Folder Action


-- SCRIPT EDITOR CODE

-- Specify the path to the folder containing the PDFs
set folderPath to "/path/to/your/folder"

-- Get a list of PDF files in the folder
set pdfFiles to paragraphs of (do shell script "ls " & quoted form of folderPath & "/*.pdf")

-- Loop through each PDF file and print
repeat with pdfFile in pdfFiles
	
	printPDF(pdfFile)
end repeat


on printPDF(pdfFile)
	try
		set fullPath to quoted form of (pdfFile)
		do shell script "open -a 'Preview' " & fullPath
		delay 2
		tell application "System Events"
			tell process "Preview"
				keystroke "p" using command down
				delay 1
				keystroke return
			end tell
		end tell
	on error errMsg
		display dialog "Error: " & errMsg
	end try
end printPDF



-- AUTOMATOR CODE

-- on run {input, parameters}
-- 	-- Specify the path to the folder containing the PDFs
-- 	set folderPath to "/path/to/your/folder"
	
-- 	-- Get a list of PDF files in the folder
-- 	set pdfFiles to paragraphs of (do shell script "ls " & quoted form of folderPath & "/*.pdf")
	
-- 	-- Loop through each PDF file and print
-- 	repeat with pdfFile in pdfFiles
		
-- 		printPDF(pdfFile)
-- 	end repeat
	
-- 	return input
-- end run


-- on printPDF(pdfFile)
-- 	try
-- 		set fullPath to quoted form of (pdfFile)
-- 		do shell script "open -a 'Preview' " & fullPath
-- 		delay 2 -- adjust this delay if necessary
-- 		tell application "System Events"
-- 			tell process "Preview"
-- 				keystroke "p" using command down
-- 				delay 1 -- adjust this delay if necessary
-- 				keystroke return
-- 			end tell
-- 		end tell
-- 	on error errMsg
-- 		display dialog "Error: " & errMsg
-- 	end try
-- end printPDF
