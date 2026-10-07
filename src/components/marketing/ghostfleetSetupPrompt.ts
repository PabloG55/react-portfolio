export const ghostfleetSetupPrompt = `Install ghostfleet (https://github.com/PabloG55/ghostfleet) for me and set it up the way I want.

Before running anything, ask me these in ONE numbered list, with your recommended default in brackets, and wait for my answers:
1. Install missing dependencies (tmux, jq) for me? This may use brew or sudo apt. [yes]
2. Jarvis (experimental): one session above every project's lead that I can type or talk to from my phone. Enable it? [no]
3. If Jarvis: voice input with whisper.cpp plus a speech model, about 550 MB, transcribed locally? [no]
4. Kokoro, a natural voice (about 350 MB) for reading replies aloud on the phone, falling back to the phone's own voice if I say no? [no]
5. fleet-shots (experimental): record a flow as video with the request behind each step, so I can review it? [no]
6. Do I want the fleet on my phone (uses Tailscale)? [later]
Only if $EDITOR is unset AND nvim isn't installed, add: which terminal editor should Ctrl-N open (nvim, vim, hx, micro, nano, emacs -nw)? [nvim]

Then:
- Run \`npx ghostfleet-cli --yes\` if I said yes to 1, otherwise \`npx ghostfleet-cli\`. The --yes goes AFTER the package name.
- Then run only the steps I said yes to:
  2: fleet-experimental enable jarvis
  3: fleet-jarvis voice --install
  4: fleet-jarvis voice --kokoro --install
  5: fleet-experimental enable shots
  6: run \`fleet-phone\` and walk me through the one next step it prints
  editor: add \`export CLAUDE_FLEET_EDITOR=<editor>\` to my shell rc and tell me which file you changed
- Never launch the interactive \`ghostfleet\` screen yourself (it needs a real terminal and will hang). When you're done, tell me to run \`ghostfleet\` in my terminal.
- Finish with what got installed, what you skipped, and any warning the installer printed. Quote the warnings; don't summarise them.`;
